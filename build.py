#!/usr/bin/env python3
"""
Build script: renders templates/ + locales/ → static HTML files.

  EN → root directory  (templates/index.html → index.html)
  DE → de/ directory   (templates/index.html → de/index.html)

Usage:
  python3 build.py            # build all templates
  python3 build.py --check    # build into temp dir and diff (for CI)

CI integration:
  Re-run build.py and check `git diff --exit-code` to catch stale builds.
"""
import re
import sys
from pathlib import Path

try:
    import yaml
except ImportError:
    sys.exit("Missing dependency: pip install pyyaml")

ROOT = Path(__file__).parent
TEMPLATES_DIR = ROOT / "templates"
LOCALES_DIR = ROOT / "locales"

# Maps language code → output directory
LANGS = {
    "en": ROOT,
    "de": ROOT / "de",
}


def render(template: str, strings: dict) -> str:
    """Replace {{ key }} placeholders with values from strings dict."""
    def replace(m):
        key = m.group(1).strip()
        if key not in strings:
            print(f"  WARNING: key '{key}' not found in locale", file=sys.stderr)
            return m.group(0)  # leave placeholder unchanged so it's visible
        return str(strings[key])
    return re.sub(r"\{\{\s*([\w.]+)\s*\}\}", replace, template)


def load_locales() -> dict:
    locales = {}
    for lang in LANGS:
        locale_file = LOCALES_DIR / f"{lang}.yaml"
        if not locale_file.exists():
            sys.exit(f"ERROR: Missing locale file: {locale_file}")
        with locale_file.open(encoding="utf-8") as f:
            locales[lang] = yaml.safe_load(f) or {}
    return locales


def build() -> int:
    """Build all templates. Returns count of files written."""
    if not TEMPLATES_DIR.exists():
        print("No templates/ directory found. Nothing to build.")
        return 0

    locales = load_locales()

    templates = sorted(TEMPLATES_DIR.rglob("*.html"))
    if not templates:
        print("No HTML templates found in templates/")
        return 0

    built = 0
    for tmpl_path in templates:
        rel = tmpl_path.relative_to(TEMPLATES_DIR)
        source = tmpl_path.read_text(encoding="utf-8")

        for lang, out_dir in LANGS.items():
            strings = {**locales[lang], "lang": lang}
            rendered = render(source, strings)

            out_path = out_dir / rel
            out_path.parent.mkdir(parents=True, exist_ok=True)
            out_path.write_text(rendered, encoding="utf-8")

            print(f"  [{lang}] {rel} → {out_path.relative_to(ROOT)}")
            built += 1

    return built


def check_mode():
    """Build into a temp dir and diff against working tree. Exit 1 if stale."""
    locales = load_locales()
    templates = sorted(TEMPLATES_DIR.rglob("*.html"))

    stale = []
    for tmpl_path in templates:
        rel = tmpl_path.relative_to(TEMPLATES_DIR)
        source = tmpl_path.read_text(encoding="utf-8")

        for lang, real_dir in LANGS.items():
            strings = {**locales[lang], "lang": lang}
            rendered = render(source, strings)
            real_file = real_dir / rel

            if not real_file.exists():
                stale.append(f"  MISSING: {real_file.relative_to(ROOT)}")
            elif real_file.read_text(encoding="utf-8") != rendered:
                stale.append(f"  STALE:   {real_file.relative_to(ROOT)}")

    if stale:
        print("Build check FAILED — stale generated files:", file=sys.stderr)
        for s in stale:
            print(s, file=sys.stderr)
        print("\nRun `python3 build.py` to regenerate.", file=sys.stderr)
        sys.exit(1)
    else:
        print("Build check passed — all generated files are up to date.")


if __name__ == "__main__":
    if "--check" in sys.argv:
        check_mode()
    else:
        n = build()
        print(f"\nBuild complete: {n} file(s) written.")
