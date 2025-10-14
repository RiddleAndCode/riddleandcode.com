#!/usr/bin/env node

/**
 * Simple Static Site Generator for Riddle&Code Website
 * Processes templates with includes and variables
 */

const fs = require('fs');
const path = require('path');

class SiteGenerator {
    constructor(sourceDir, outputDir) {
        this.sourceDir = sourceDir;
        this.outputDir = outputDir;
        this.components = {};
        this.loadComponents();
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
        
        // Process includes
        processed = processed.replace(/\{\%include\s+(.+?)\%\}/g, (match, includePath) => {
            const componentName = includePath.replace('components/', '').replace('.html', '');
            if (this.components[componentName]) {
                return this.processTemplate(this.components[componentName], variables);
            }
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
        // Simple condition evaluation
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
        
        // Simple boolean check
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
    
    generatePage(pageConfig) {
        const templatePath = path.join(this.sourceDir, 'templates', pageConfig.template || 'base.html');
        const template = fs.readFileSync(templatePath, 'utf8');
        
        const variables = {
            ...pageConfig,
            site: {
                name: 'Riddle&Code',
                url: 'https://www.riddleandcode.com'
            }
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
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SiteGenerator;
}

// CLI usage
if (require.main === module) {
    const sourceDir = process.argv[2] || './';
    const outputDir = process.argv[3] || './build';
    
    const generator = new SiteGenerator(sourceDir, outputDir);
    
    // Example page configurations
    const pages = [
        {
            template: 'base.html',
            output: 'index.html',
            lang: 'en',
            current_page: 'index.html',
            page_title: 'Industry Solutions for Web3',
            page_description: 'Unlock the full potential of industrial machines for Web3. Build applications and maximise productivity for your business with our industry solutions for Web3.',
            content: '<div class="hero"><div class="container"><h1>From Community to Power Plant</h1><p>Riddle&Code empowers energy communities to maximize their potential through intelligent infrastructure solutions.</p></div></div>'
        },
        {
            template: 'base.html',
            output: 'de.html',
            lang: 'de',
            current_page: 'de.html',
            page_title: 'Industrielösungen für Web3',
            page_description: 'Schöpfen Sie das volle Potenzial von Industriemaschinen für Web3 aus. Erstellen Sie Anwendungen und maximieren Sie die Produktivität Ihres Unternehmens.',
            content: '<div class="hero"><div class="container"><h1>Von der Energiegemeinschaft zum Kraftwerk</h1><p>Riddle&Code ermöglicht es Energiegemeinschaften, ihr Potenzial durch intelligente Infrastrukturlösungen zu maximieren.</p></div></div>'
        }
    ];
    
    // Generate pages
    pages.forEach(page => generator.generatePage(page));
    
    // Copy assets
    generator.copyAssets();
    
    console.log('Site generation complete!');
}