# riddleandcode.com — Static Site

Bilingual static site for [riddleandcode.com](https://riddleandcode.com). Pages are generated from templates and locale files by a Python build script.

## Prerequisites

Python 3.8+ and PyYAML:

```bash
pip install -r requirements.txt
```

## Building

```bash
python3 build.py
```

This reads every file under `templates/` and renders it twice — once in English (output to the repo root) and once in German (output to `de/`).

**Example:**
```
templates/kern/for-utilities.html  →  kern/for-utilities.html      (EN)
                                   →  de/kern/for-utilities.html   (DE)
templates/includes/nav.html        →  includes/nav.html             (EN)
                                   →  de/includes/nav.html          (DE)
```

Currently produces **30 files** across both languages.

## How it works

### Templates (`templates/`)

HTML files with `{{ key }}` placeholders. The build substitutes every placeholder with the value from the active locale file.

```html
<h1>{{ ku_h1 }}</h1>
<p class="lead">{{ ku_lead }}</p>
```

`<pre>` blocks (ASCII diagrams, code loops) are kept as static content and not templated, to avoid YAML escaping complexity.

### Locale files (`locales/`)

| File | Language |
|------|----------|
| `locales/en.yaml` | English |
| `locales/de.yaml` | German  |

Keys are grouped by page using a prefix convention:

| Prefix | Page |
|--------|------|
| `shared_` | Strings reused across pages |
| `nav_` | Navigation bar |
| `footer_` | Footer |
| `ki_` | `kern/index.html` |
| `ku_` | `kern/for-utilities.html` |
| `ka_` | `kern/for-aggregators.html` |
| `kc_` | `kern/for-communities.html` |
| `kp_` | `kern/for-platforms.html` |
| `rp_` | `references/index.html` |
| `tech_` | `technology/index.html` |
| `au_` | `company/about-us.html` |
| `git_` | `company/get-in-touch.html` |
| `med_` | `company/media.html` |
| `car_` | `company/career.html` |
| `news_` | `company/news.html` |

### Navigation prefix (`nav_prefix`)

Internal links in nav and footer templates use `{{ nav_prefix }}`:

```html
<a href="{{ nav_prefix }}kern/">{{ nav_products }}</a>
```

| Locale | Value | Resulting link |
|--------|-------|----------------|
| `en.yaml` | `"/"` | `/kern/` |
| `de.yaml` | `"/de/"` | `/de/kern/` |

### Runtime component loading (`scripts/main.js`)

The nav and footer are loaded at runtime via `fetch()`. `main.js` detects whether the current URL starts with `/de/` and loads the correct include:

- EN pages → `includes/nav.html`, `includes/footer.html`
- DE pages → `de/includes/nav.html`, `de/includes/footer.html`

## Adding a new page

1. Create `templates/<section>/page.html` with `{{ key }}` placeholders.
2. Add the corresponding keys to both `locales/en.yaml` and `locales/de.yaml`.
3. Run `python3 build.py`.

## Checking for stale builds (CI)

```bash
python3 build.py --check
```

Renders into a temp directory and diffs against the working tree. Exits non-zero if any generated file is out of date. Used by the GitHub Actions `build-fresh` job.

## Serving locally

Any static file server works. For example:

```bash
python3 -m http.server 8089
```

Then open [http://localhost:8089](http://localhost:8089).

## Directory structure

```
templates/          Source templates (edit these, not the output)
  includes/         nav.html, footer.html
  index.html
  kern/
  company/
  references/
  technology/
locales/
  en.yaml           English strings
  de.yaml           German strings
build.py            Build script
requirements.txt    Python dependencies (pyyaml)
scripts/main.js     Runtime: component loading, nav, animations
styles/main.css     Global stylesheet
includes/           Generated EN nav/footer (do not edit directly)
de/                 Generated DE output (do not edit directly)
```
