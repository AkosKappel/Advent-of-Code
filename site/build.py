"""Builds the GitHub Pages dashboard into _site/.

Puzzle titles and stars come from the root README, solution sizes from the
source files. The data is embedded into index.html, so the page needs no fetch
for it and also works when opened straight from disk.
"""

import json
import re
import subprocess
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "_site"

YEARS = {
    "2018": ("Go", "day{d:02}/main.go", "day{d:02}/main_test.go"),
    "2019": ("Java", "src/main/java/aoc/Day{d:02}.java", "src/test/java/aoc/Day{d:02}Test.java"),
    "2020": ("Kotlin", "src/main/kotlin/Day{d:02}.kt", "src/test/kotlin/Day{d:02}Test.kt"),
    "2021": ("Python", "src/day{d:02}.py", "tests/test_day{d:02}.py"),
    "2022": ("TypeScript", "src/day{d:02}.ts", "tests/day{d:02}.test.ts"),
    "2023": ("JavaScript", "src/day{d}.js", "tests/day{d}.test.js"),
    "2024": ("C#", "AdventOfCode/Day{d:02}.cs", "AdventOfCode/Tests/Day{d:02}Test.cs"),
    "2025": ("Elixir", "lib/advent_of_code/day_{d:02}.ex", "test/advent_of_code/day_{d:02}_test.exs"),
}

DAY_CELL = re.compile(
    r'adventofcode\.com/(\d{4})/day/(\d+)">([^<]+)</a><br>\s*<span>(⭐*)</span>'
)


def count_lines(path: Path) -> int:
    return sum(1 for line in path.read_text(encoding="utf-8").splitlines() if line.strip())


def collect() -> list[dict]:
    puzzles: dict[str, list[dict]] = {year: [] for year in YEARS}
    readme = (ROOT / "README.md").read_text(encoding="utf-8")
    for year, day, title, stars in DAY_CELL.findall(readme):
        _, src, test = YEARS[year]
        day = int(day)
        src, test = src.format(d=day), test.format(d=day)
        source = ROOT / year / src
        if not source.exists():
            raise FileNotFoundError(f"README lists {year} day {day}, but {source} is missing")
        puzzles[year].append({
            "day": day,
            "title": title,
            "stars": len(stars),
            "lines": count_lines(source),
            "src": f"{year}/{src}",
            "test": f"{year}/{test}",
        })
    for year, days in puzzles.items():
        if not days:
            raise ValueError(f"No puzzles for {year} found in README.md, has the star grid format changed?")
    return [
        {"year": year, "language": lang, "days": sorted(puzzles[year], key=lambda p: p["day"])}
        for year, (lang, _, _) in YEARS.items()
    ]


def main() -> None:
    commit = subprocess.run(
        ["git", "rev-parse", "--short", "HEAD"], cwd=ROOT, capture_output=True, text=True, check=True
    ).stdout.strip()
    data = {"years": collect(), "commit": commit, "built": date.today().isoformat()}

    template = (ROOT / "site" / "index.html").read_text(encoding="utf-8")
    # "</" inside the JSON would end the <script> element early
    payload = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")
    OUT.mkdir(exist_ok=True)
    (OUT / "index.html").write_text(template.replace("/*DATA*/null", payload), encoding="utf-8")
    print(f"Built {OUT / 'index.html'}: {sum(len(y['days']) for y in data['years'])} puzzles")


if __name__ == "__main__":
    main()
