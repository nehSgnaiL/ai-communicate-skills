#!/usr/bin/env python3
"""Validate distributable skill metadata and repository-local Markdown links."""

from pathlib import Path
import re
import sys
from urllib.parse import unquote, urlsplit

try:
    import yaml
except ImportError:
    raise SystemExit("Install development dependencies: python -m pip install -r requirements-dev.txt")


ROOT = Path(__file__).resolve().parents[1]
NAME = re.compile(r"[a-z0-9]+(?:-[a-z0-9]+)*")
LINK = re.compile(r"\[[^\]\n]*\]\(([^)\n]+)\)")


def load_mapping(path, errors):
    try:
        value = yaml.safe_load(path.read_text(encoding="utf-8"))
        if not isinstance(value, dict):
            raise ValueError("expected a YAML mapping")
        return value
    except (OSError, ValueError, yaml.YAMLError) as exc:
        errors.append(f"{path.relative_to(ROOT)}: {exc}")
        return {}


def check_skill(path, errors):
    text = path.read_text(encoding="utf-8")
    frontmatter = re.match(r"\A---\r?\n(.*?)\r?\n---(?:\r?\n|$)", text, re.DOTALL)
    label = path.relative_to(ROOT)
    if not frontmatter:
        errors.append(f"{label}: missing YAML frontmatter")
        return
    try:
        data = yaml.safe_load(frontmatter.group(1))
    except yaml.YAMLError as exc:
        errors.append(f"{label}: {exc}")
        return
    if not isinstance(data, dict):
        errors.append(f"{label}: frontmatter must be a mapping")
        return
    name = data.get("name")
    if not isinstance(name, str) or not NAME.fullmatch(name) or len(name) > 64:
        errors.append(f"{label}: invalid skill name")
    elif name != path.parent.name:
        errors.append(f"{label}: name must match folder {path.parent.name}")
    description = data.get("description")
    if not isinstance(description, str) or not description.strip() or len(description) > 1024:
        errors.append(f"{label}: description must contain 1–1024 characters")
    elif any(char in description for char in "<>"):
        errors.append(f"{label}: description contains an angle bracket")
    if re.search(r"\[TODO:", text):
        errors.append(f"{label}: unfinished skill placeholder")
    metadata_path = path.parent / "agents" / "openai.yaml"
    if metadata_path.exists():
        metadata = load_mapping(metadata_path, errors)
        interface = metadata.get("interface", {})
        if not isinstance(interface, dict):
            errors.append(f"{metadata_path.relative_to(ROOT)}: interface must be a mapping")
            return
        for key in ("display_name", "short_description", "default_prompt"):
            if not isinstance(interface.get(key), str) or not interface[key].strip():
                errors.append(f"{metadata_path.relative_to(ROOT)}: missing {key}")
        short = interface.get("short_description", "")
        if isinstance(short, str) and not 25 <= len(short) <= 64:
            errors.append(f"{metadata_path.relative_to(ROOT)}: short_description must have 25–64 characters")
        prompt = interface.get("default_prompt", "")
        if isinstance(name, str) and isinstance(prompt, str) and f"${name}" not in prompt:
            errors.append(f"{metadata_path.relative_to(ROOT)}: default_prompt must mention ${name}")


def check_links(path, errors):
    # Ignore fenced examples: links inside code are not navigational references.
    in_fence = False
    marker = ""
    for line_number, line in enumerate(path.read_text(encoding="utf-8").splitlines(), 1):
        fence = re.match(r"\s*(`{3,}|~{3,})", line)
        if fence:
            if not in_fence:
                in_fence, marker = True, fence.group(1)
            elif fence.group(1)[0] == marker[0] and len(fence.group(1)) >= len(marker):
                in_fence = False
            continue
        if in_fence:
            continue
        for target in LINK.findall(line):
            target = target.strip().split(' "', 1)[0].strip("<>")
            parsed = urlsplit(target)
            if parsed.scheme or parsed.netloc or not parsed.path:
                continue
            destination = (path.parent / unquote(parsed.path)).resolve()
            if not destination.is_relative_to(ROOT):
                errors.append(f"{path.relative_to(ROOT)}:{line_number}: link escapes repository: {target}")
            elif not destination.exists():
                errors.append(f"{path.relative_to(ROOT)}:{line_number}: missing local target: {target}")
            elif path.relative_to(ROOT).parts[0] == "skills" and not destination.is_relative_to(ROOT / "skills" / path.relative_to(ROOT).parts[1]):
                errors.append(f"{path.relative_to(ROOT)}:{line_number}: skill link escapes its installable folder: {target}")


def main():
    errors = []
    skills = sorted((ROOT / "skills").glob("*/SKILL.md"))
    if not skills:
        errors.append("No installable skills found")
    for skill in skills:
        check_skill(skill, errors)
    markdown = sorted(path for path in ROOT.rglob("*.md") if not any(part in {".git", "node_modules", ".venv"} for part in path.relative_to(ROOT).parts))
    for path in markdown:
        check_links(path, errors)
    if errors:
        print("Validation failed:\n" + "\n".join(f"- {error}" for error in errors))
        return 1
    print(f"Validated {len(skills)} skill(s) and local links in {len(markdown)} Markdown files.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
