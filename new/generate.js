#!/usr/bin/env node

/**
 * Enhanced Static Site Generator for Riddle&Code Website
 * Processes templates with includes, variables, and configuration
 */

const fs = require('fs');
const path = require('path');

class SiteGenerator {
    constructor(sourceDir, outputDir, configPath) {
        this.sourceDir = sourceDir;
        this.outputDir = outputDir;
        this.components = {};
        this.config = this.loadConfig(configPath);
        this.loadComponents();
    }
    
    loadConfig(configPath) {
        if (fs.existsSync(configPath)) {
            const configContent = fs.readFileSync(configPath, 'utf8');
            return JSON.parse(configContent);
        }
        return { site: {}, pages: [] };
    }
    
    loadComponents() {
        const componentsDir = path.join(this.sourceDir, 'components');
        if (fs.existsSync(componentsDir)) {
            const files = fs.readdirSync(componentsDir);
            files.forEach(file => {
                if (file.endsWith('.html')) {
                    const name = file.replace('.html', '');
                    const content = fs.readFileSync(path.join(componentsDir, file), 'utf8');
                    this.components[name] = content;
                }
            });
        }
    }
    
    processTemplate(template, variables = {}) {
        let processed = template;
        
        // Process includes first
        processed = processed.replace(/\{\%include\s+(.+?)\%\}/g, (match, includePath) => {
            const componentName = includePath.replace('components/', '').replace('.html', '');
            if (this.components[componentName]) {
                return this.processTemplate(this.components[componentName], variables);
            }
            console.warn(`Component not found: ${componentName}`);
            return match;
        });
        
        // Process if statements
        processed = processed.replace(/\{\%if\s+(.+?)\%\}([\s\S]*?)\{\%else\%\}([\s\S]*?)\{\%endif\%\}/g, (match, condition, ifContent, elseContent) => {
            return this.evaluateCondition(condition, variables) ? ifContent : elseContent;
        });
        
        processed = processed.replace(/\{\%if\s+(.+?)\%\}([\s\S]*?)\{\%endif\%\}/g, (match, condition, content) => {
            return this.evaluateCondition(condition, variables) ? content : '';
        });
        
        // Process variables
        processed = processed.replace(/\{\{(.+?)\}\}/g, (match, variable) => {
            const varPath = variable.trim().split('.');
            let value = variables;
            for (const part of varPath) {
                if (value && typeof value === 'object' && part in value) {
                    value = value[part];
                } else {
                    return '';
                }
            }
            return value || '';
        });
        
        return processed;
    }
    
    evaluateCondition(condition, variables) {
        const cleanCondition = condition.trim();
        
        if (cleanCondition.includes('==')) {
            const [left, right] = cleanCondition.split('==').map(s => s.trim());
            const leftVal = this.getVariableValue(left, variables);
            const rightVal = right.replace(/['"]/g, '');
            return leftVal === rightVal;
        }
        
        if (cleanCondition.includes('!=')) {
            const [left, right] = cleanCondition.split('!=').map(s => s.trim());
            const leftVal = this.getVariableValue(left, variables);
            const rightVal = right.replace(/['"]/g, '');
            return leftVal !== rightVal;
        }
        
        return this.getVariableValue(cleanCondition, variables);
    }
    
    getVariableValue(varName, variables) {
        const parts = varName.split('.');
        let value = variables;
        for (const part of parts) {
            if (value && typeof value === 'object' && part in value) {
                value = value[part];
            } else {
                return null;
            }
        }
        return value;
    }
    
    loadContent(contentFile) {
        const contentPath = path.join(this.sourceDir, contentFile);
        if (fs.existsSync(contentPath)) {
            return fs.readFileSync(contentPath, 'utf8');
        }
        console.warn(`Content file not found: ${contentFile}`);
        return '';
    }
    
    generatePage(pageConfig) {
        const templatePath = path.join(this.sourceDir, 'templates', pageConfig.template || 'base.html');
        
        if (!fs.existsSync(templatePath)) {
            console.error(`Template not found: ${pageConfig.template || 'base.html'}`);
            return;
        }
        
        const template = fs.readFileSync(templatePath, 'utf8');
        
        // Load content from file if specified
        let content = pageConfig.content || '';
        if (pageConfig.content_file) {
            content = this.loadContent(pageConfig.content_file);
        }
        
        const variables = {
            ...pageConfig,
            content: content,
            site: this.config.site || {}
        };
        
        const html = this.processTemplate(template, variables);
        
        const outputPath = path.join(this.outputDir, pageConfig.output);
        const outputDirPath = path.dirname(outputPath);
        
        if (!fs.existsSync(outputDirPath)) {
            fs.mkdirSync(outputDirPath, { recursive: true });
        }
        
        fs.writeFileSync(outputPath, html);
        console.log(`Generated: ${pageConfig.output}`);
    }
    
    copyAssets() {
        const assetsSource = path.join(this.sourceDir, 'assets');
        const assetsOutput = path.join(this.outputDir, 'assets');
        
        if (fs.existsSync(assetsSource)) {
            this.copyDirectory(assetsSource, assetsOutput);
            console.log('Assets copied');
        }
    }
    
    copyDirectory(source, destination) {
        if (!fs.existsSync(destination)) {
            fs.mkdirSync(destination, { recursive: true });
        }
        
        const files = fs.readdirSync(source);
        files.forEach(file => {
            const sourcePath = path.join(source, file);
            const destPath = path.join(destination, file);
            
            if (fs.statSync(sourcePath).isDirectory()) {
                this.copyDirectory(sourcePath, destPath);
            } else {
                fs.copyFileSync(sourcePath, destPath);
            }
        });
    }
    
    generateSite() {
        console.log('Starting site generation...');
        
        // Ensure output directory exists
        if (!fs.existsSync(this.outputDir)) {
            fs.mkdirSync(this.outputDir, { recursive: true });
        }
        
        // Generate all pages
        this.config.pages.forEach(page => {
            this.generatePage(page);
        });
        
        // Copy assets
        this.copyAssets();
        
        console.log(`Site generation complete! Output: ${this.outputDir}`);
    }
}

// CLI usage
if (require.main === module) {
    const sourceDir = process.argv[2] || './';
    const outputDir = process.argv[3] || './build';
    const configPath = process.argv[4] || './site-config.json';
    
    const generator = new SiteGenerator(sourceDir, outputDir, configPath);
    generator.generateSite();
}

module.exports = SiteGenerator;