# Advent of Code

My solutions to [Advent of Code](https://adventofcode.com) puzzles, written in a different language every year.

**374 / 374 stars** across 8 years and 8 languages. Every solution is covered by tests against the puzzle examples and my own input.

| Year | Language | Stars | Tests |
| :---: | --- | :---: | --- |
| [2018](./2018) | <img src='./misc/go.svg' alt='' width='16' height='16' /> Go | 50 ⭐ | [![2018 tests](https://github.com/AkosKappel/Advent-of-Code/actions/workflows/2018.yml/badge.svg)](https://github.com/AkosKappel/Advent-of-Code/actions/workflows/2018.yml) |
| [2019](./2019) | <img src='./misc/java.svg' alt='' width='16' height='16' /> Java | 50 ⭐ | [![2019 tests](https://github.com/AkosKappel/Advent-of-Code/actions/workflows/2019.yml/badge.svg)](https://github.com/AkosKappel/Advent-of-Code/actions/workflows/2019.yml) |
| [2020](./2020) | <img src='./misc/kotlin.svg' alt='' width='16' height='16' /> Kotlin | 50 ⭐ | [![2020 tests](https://github.com/AkosKappel/Advent-of-Code/actions/workflows/2020.yml/badge.svg)](https://github.com/AkosKappel/Advent-of-Code/actions/workflows/2020.yml) |
| [2021](./2021) | <img src='./misc/python.svg' alt='' width='16' height='16' /> Python | 50 ⭐ | [![2021 tests](https://github.com/AkosKappel/Advent-of-Code/actions/workflows/2021.yml/badge.svg)](https://github.com/AkosKappel/Advent-of-Code/actions/workflows/2021.yml) |
| [2022](./2022) | <img src='./misc/typescript.svg' alt='' width='16' height='16' /> TypeScript | 50 ⭐ | [![2022 tests](https://github.com/AkosKappel/Advent-of-Code/actions/workflows/2022.yml/badge.svg)](https://github.com/AkosKappel/Advent-of-Code/actions/workflows/2022.yml) |
| [2023](./2023) | <img src='./misc/javascript.svg' alt='' width='16' height='16' /> JavaScript | 50 ⭐ | [![2023 tests](https://github.com/AkosKappel/Advent-of-Code/actions/workflows/2023.yml/badge.svg)](https://github.com/AkosKappel/Advent-of-Code/actions/workflows/2023.yml) |
| [2024](./2024) | <img src='./misc/csharp.svg' alt='' width='16' height='16' /> C# | 50 ⭐ | [![2024 tests](https://github.com/AkosKappel/Advent-of-Code/actions/workflows/2024.yml/badge.svg)](https://github.com/AkosKappel/Advent-of-Code/actions/workflows/2024.yml) |
| [2025](./2025) | <img src='./misc/elixir.svg' alt='' width='16' height='16' /> Elixir | 24 ⭐ | [![2025 tests](https://github.com/AkosKappel/Advent-of-Code/actions/workflows/2025.yml/badge.svg)](https://github.com/AkosKappel/Advent-of-Code/actions/workflows/2025.yml) |

## Running the tests

Each year is a self-contained project. Every day has two kinds of tests:

- **Example tests** run the samples from the puzzle description. They are fast, and CI runs only these.
- **Solution tests** run my full puzzle input. Some of them take a while.

From inside a year's folder, run all tests with the project's usual test command, or only the example tests with:

| Year | Example tests only |
| :---: | --- |
| 2018 | `go test ./... -run //Example` |
| 2019 | `mvn test -Dtest='*Test*#testExample*'` |
| 2020 | `./gradlew test --tests '*example*'` |
| 2021 | `cd tests && PYTHONPATH=.. python -m pytest -k example` |
| 2022 | `npx jest -t example` |
| 2023 | `npx jest -t example` |
| 2024 | `dotnet test --filter 'Name~Example'` |
| 2025 | `mix test --only test:'test part1 example' --only test:'test part2 example'` |

## Puzzles

<details>
<summary><b>2018</b> · Go · 50 ⭐</summary>

<table>
  <tr>
    <td>
      <b>Day 1</b><br>
      <a href="https://adventofcode.com/2018/day/1">Chronal Calibration</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 2</b><br>
      <a href="https://adventofcode.com/2018/day/2">Inventory Management System</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 3</b><br>
      <a href="https://adventofcode.com/2018/day/3">No Matter How You Slice It</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 4</b><br>
      <a href="https://adventofcode.com/2018/day/4">Repose Record</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 5</b><br>
      <a href="https://adventofcode.com/2018/day/5">Alchemical Reduction</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 6</b><br>
      <a href="https://adventofcode.com/2018/day/6">Chronal Coordinates</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 7</b><br>
      <a href="https://adventofcode.com/2018/day/7">The Sum of Its Parts</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 8</b><br>
      <a href="https://adventofcode.com/2018/day/8">Memory Maneuver</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 9</b><br>
      <a href="https://adventofcode.com/2018/day/9">Marble Mania</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 10</b><br>
      <a href="https://adventofcode.com/2018/day/10">The Stars Align</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 11</b><br>
      <a href="https://adventofcode.com/2018/day/11">Chronal Charge</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 12</b><br>
      <a href="https://adventofcode.com/2018/day/12">Subterranean Sustainability</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 13</b><br>
      <a href="https://adventofcode.com/2018/day/13">Mine Cart Madness</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 14</b><br>
      <a href="https://adventofcode.com/2018/day/14">Chocolate Charts</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 15</b><br>
      <a href="https://adventofcode.com/2018/day/15">Beverage Bandits</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 16</b><br>
      <a href="https://adventofcode.com/2018/day/16">Chronal Classification</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 17</b><br>
      <a href="https://adventofcode.com/2018/day/17">Reservoir Research</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 18</b><br>
      <a href="https://adventofcode.com/2018/day/18">Settlers of The North Pole</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 19</b><br>
      <a href="https://adventofcode.com/2018/day/19">Go With The Flow</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 20</b><br>
      <a href="https://adventofcode.com/2018/day/20">A Regular Map</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 21</b><br>
      <a href="https://adventofcode.com/2018/day/21">Chronal Conversion</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 22</b><br>
      <a href="https://adventofcode.com/2018/day/22">Mode Maze</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 23</b><br>
      <a href="https://adventofcode.com/2018/day/23">Experimental Emergency Teleportation</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 24</b><br>
      <a href="https://adventofcode.com/2018/day/24">Immune System Simulator 20XX</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 25</b><br>
      <a href="https://adventofcode.com/2018/day/25">FourDimensional Adventure</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
</table>

</details>

<details>
<summary><b>2019</b> · Java · 50 ⭐</summary>

<table style="text-align: center; width: 1200px;">
  <tr>
    <td>
      <b>Day 1</b><br>
      <a href="https://adventofcode.com/2019/day/1">The Tyranny of the Rocket Equation</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 2</b><br>
      <a href="https://adventofcode.com/2019/day/2">1202 Program Alarm</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 3</b><br>
      <a href="https://adventofcode.com/2019/day/3">Crossed Wires</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 4</b><br>
      <a href="https://adventofcode.com/2019/day/4">Secure Container</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 5</b><br>
      <a href="https://adventofcode.com/2019/day/5">Sunny with a Chance of Asteroids</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 6</b><br>
      <a href="https://adventofcode.com/2019/day/6">Universal Orbit Map</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 7</b><br>
      <a href="https://adventofcode.com/2019/day/7">Amplification Circuit</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 8</b><br>
      <a href="https://adventofcode.com/2019/day/8">Space Image Format</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 9</b><br>
      <a href="https://adventofcode.com/2019/day/9">Sensor Boost</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 10</b><br>
      <a href="https://adventofcode.com/2019/day/10">Monitoring Station</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 11</b><br>
      <a href="https://adventofcode.com/2019/day/11">Space Police</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 12</b><br>
      <a href="https://adventofcode.com/2019/day/12">The NBody Problem</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 13</b><br>
      <a href="https://adventofcode.com/2019/day/13">Care Package</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 14</b><br>
      <a href="https://adventofcode.com/2019/day/14">Space Stoichiometry</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 15</b><br>
      <a href="https://adventofcode.com/2019/day/15">Oxygen System</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 16</b><br>
      <a href="https://adventofcode.com/2019/day/16">Flawed Frequency Transmission</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 17</b><br>
      <a href="https://adventofcode.com/2019/day/17">Set and Forget</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 18</b><br>
      <a href="https://adventofcode.com/2019/day/18">ManyWorlds Interpretation</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 19</b><br>
      <a href="https://adventofcode.com/2019/day/19">Tractor Beam</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 20</b><br>
      <a href="https://adventofcode.com/2019/day/20">Donut Maze</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 21</b><br>
      <a href="https://adventofcode.com/2019/day/21">Springdroid Adventure</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 22</b><br>
      <a href="https://adventofcode.com/2019/day/22">Slam Shuffle</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 23</b><br>
      <a href="https://adventofcode.com/2019/day/23">Category Six</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 24</b><br>
      <a href="https://adventofcode.com/2019/day/24">Planet of Discord</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 25</b><br>
      <a href="https://adventofcode.com/2019/day/25">Cryostasis</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
</table>

</details>

<details>
<summary><b>2020</b> · Kotlin · 50 ⭐</summary>

<table style="text-align: center; width: 1200px;">
  <tr>
    <td>
      <b>Day 1</b><br>
      <a href="https://adventofcode.com/2020/day/1">Report Repair</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 2</b><br>
      <a href="https://adventofcode.com/2020/day/2">Password Philosophy</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 3</b><br>
      <a href="https://adventofcode.com/2020/day/3">Toboggan Trajectory</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 4</b><br>
      <a href="https://adventofcode.com/2020/day/4">Passport Processing</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 5</b><br>
      <a href="https://adventofcode.com/2020/day/5">Binary Boarding</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 6</b><br>
      <a href="https://adventofcode.com/2020/day/6">Custom Customs</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 7</b><br>
      <a href="https://adventofcode.com/2020/day/7">Handy Haversacks</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 8</b><br>
      <a href="https://adventofcode.com/2020/day/8">Handheld Halting</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 9</b><br>
      <a href="https://adventofcode.com/2020/day/9">Encoding Error</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 10</b><br>
      <a href="https://adventofcode.com/2020/day/10">Adapter Array</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 11</b><br>
      <a href="https://adventofcode.com/2020/day/11">Seating System</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 12</b><br>
      <a href="https://adventofcode.com/2020/day/12">Rain Risk</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 13</b><br>
      <a href="https://adventofcode.com/2020/day/13">Shuttle Search</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 14</b><br>
      <a href="https://adventofcode.com/2020/day/14">Docking Data</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 15</b><br>
      <a href="https://adventofcode.com/2020/day/15">Rambunctious Recitation</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 16</b><br>
      <a href="https://adventofcode.com/2020/day/16">Ticket Translation</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 17</b><br>
      <a href="https://adventofcode.com/2020/day/17">Conway Cubes</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 18</b><br>
      <a href="https://adventofcode.com/2020/day/18">Operation Order</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 19</b><br>
      <a href="https://adventofcode.com/2020/day/19">Monster Messages</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 20</b><br>
      <a href="https://adventofcode.com/2020/day/20">Jurassic Jigsaw</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 21</b><br>
      <a href="https://adventofcode.com/2020/day/21">Allergen Assessment</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 22</b><br>
      <a href="https://adventofcode.com/2020/day/22">Crab Combat</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 23</b><br>
      <a href="https://adventofcode.com/2020/day/23">Crab Cups</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 24</b><br>
      <a href="https://adventofcode.com/2020/day/24">Lobby Layout</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 25</b><br>
      <a href="https://adventofcode.com/2020/day/25">Combo Breaker</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
</table>

</details>

<details>
<summary><b>2021</b> · Python · 50 ⭐</summary>

<table style="text-align: center; width: 1200px;">
  <tr>
    <td>
      <b>Day 1</b><br>
      <a href="https://adventofcode.com/2021/day/1">Sonar Sweep</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 2</b><br>
      <a href="https://adventofcode.com/2021/day/2">Dive!</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 3</b><br>
      <a href="https://adventofcode.com/2021/day/3">Binary Diagnostic</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 4</b><br>
      <a href="https://adventofcode.com/2021/day/4">Giant Squid</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 5</b><br>
      <a href="https://adventofcode.com/2021/day/5">Hydrothermal Venture</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 6</b><br>
      <a href="https://adventofcode.com/2021/day/6">Lanternfish</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 7</b><br>
      <a href="https://adventofcode.com/2021/day/7">The Treachery of Whales</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 8</b><br>
      <a href="https://adventofcode.com/2021/day/8">Seven Segment Search</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 9</b><br>
      <a href="https://adventofcode.com/2021/day/9">Smoke Basin</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 10</b><br>
      <a href="https://adventofcode.com/2021/day/10">Syntax Scoring</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 11</b><br>
      <a href="https://adventofcode.com/2021/day/11">Dumbo Octopus</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 12</b><br>
      <a href="https://adventofcode.com/2021/day/12">Passage Pathing</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 13</b><br>
      <a href="https://adventofcode.com/2021/day/13">Transparent Origami</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 14</b><br>
      <a href="https://adventofcode.com/2021/day/14">Extended Polymerization</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 15</b><br>
      <a href="https://adventofcode.com/2021/day/15">Chiton</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 16</b><br>
      <a href="https://adventofcode.com/2021/day/16">Packet Decoder</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 17</b><br>
      <a href="https://adventofcode.com/2021/day/17">Trick Shot</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 18</b><br>
      <a href="https://adventofcode.com/2021/day/18">Snailfish</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 19</b><br>
      <a href="https://adventofcode.com/2021/day/19">Beacon Scanner</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 20</b><br>
      <a href="https://adventofcode.com/2021/day/20">Trench Map</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 21</b><br>
      <a href="https://adventofcode.com/2021/day/21">Dirac Dice</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 22</b><br>
      <a href="https://adventofcode.com/2021/day/22">Reactor Reboot</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 23</b><br>
      <a href="https://adventofcode.com/2021/day/23">Amphipod</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 24</b><br>
      <a href="https://adventofcode.com/2021/day/24">Arithmetic Logic Unit</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 25</b><br>
      <a href="https://adventofcode.com/2021/day/25">Sea Cucumber</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
</table>

</details>

<details>
<summary><b>2022</b> · TypeScript · 50 ⭐</summary>

<table style="text-align: center; width: 1200px;">
  <tr>
    <td>
      <b>Day 1</b><br>
      <a href="https://adventofcode.com/2022/day/1">Calorie Counting</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 2</b><br>
      <a href="https://adventofcode.com/2022/day/2">Rock Paper Scissors</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 3</b><br>
      <a href="https://adventofcode.com/2022/day/3">Rucksack Reorganization</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 4</b><br>
      <a href="https://adventofcode.com/2022/day/4">Camp Cleanup</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 5</b><br>
      <a href="https://adventofcode.com/2022/day/5">Supply Stacks</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 6</b><br>
      <a href="https://adventofcode.com/2022/day/6">Tuning Trouble</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 7</b><br>
      <a href="https://adventofcode.com/2022/day/7">No Space Left On Device</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 8</b><br>
      <a href="https://adventofcode.com/2022/day/8">Treetop Tree House</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 9</b><br>
      <a href="https://adventofcode.com/2022/day/9">Rope Bridge</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 10</b><br>
      <a href="https://adventofcode.com/2022/day/10">CathodeRay Tube</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 11</b><br>
      <a href="https://adventofcode.com/2022/day/11">Monkey in the Middle</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 12</b><br>
      <a href="https://adventofcode.com/2022/day/12">Hill Climbing Algorithm</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 13</b><br>
      <a href="https://adventofcode.com/2022/day/13">Distress Signal</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 14</b><br>
      <a href="https://adventofcode.com/2022/day/14">Regolith Reservoir</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 15</b><br>
      <a href="https://adventofcode.com/2022/day/15">Beacon Exclusion Zone</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 16</b><br>
      <a href="https://adventofcode.com/2022/day/16">Proboscidea Volcanium</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 17</b><br>
      <a href="https://adventofcode.com/2022/day/17">Pyroclastic Flow</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 18</b><br>
      <a href="https://adventofcode.com/2022/day/18">Boiling Boulders</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 19</b><br>
      <a href="https://adventofcode.com/2022/day/19">Not Enough Minerals</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 20</b><br>
      <a href="https://adventofcode.com/2022/day/20">Grove Positioning System</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 21</b><br>
      <a href="https://adventofcode.com/2022/day/21">Monkey Math</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 22</b><br>
      <a href="https://adventofcode.com/2022/day/22">Monkey Map</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 23</b><br>
      <a href="https://adventofcode.com/2022/day/23">Unstable Diffusion</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 24</b><br>
      <a href="https://adventofcode.com/2022/day/24">Blizzard Basin</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 25</b><br>
      <a href="https://adventofcode.com/2022/day/25">Full of Hot Air</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
</table>

</details>

<details>
<summary><b>2023</b> · JavaScript · 50 ⭐</summary>

<table>
  <tr>
    <td>
      <b>Day 1</b><br>
      <a href="https://adventofcode.com/2023/day/1">Trebuchet?!</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 2</b><br>
      <a href="https://adventofcode.com/2023/day/2">Cube Conundrum</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 3</b><br>
      <a href="https://adventofcode.com/2023/day/3">Gear Ratios</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 4</b><br>
      <a href="https://adventofcode.com/2023/day/4">Scratchcards</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 5</b><br>
      <a href="https://adventofcode.com/2023/day/5">If You Give A Seed A Fertilizer</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 6</b><br>
      <a href="https://adventofcode.com/2023/day/6">Wait For It</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 7</b><br>
      <a href="https://adventofcode.com/2023/day/7">Camel Cards</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 8</b><br>
      <a href="https://adventofcode.com/2023/day/8">Haunted Wasteland</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 9</b><br>
      <a href="https://adventofcode.com/2023/day/9">Mirage Maintenance</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 10</b><br>
      <a href="https://adventofcode.com/2023/day/10">Pipe Maze</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
    <tr>
    <td>
      <b>Day 11</b><br>
      <a href="https://adventofcode.com/2023/day/11">Cosmic Expansion</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 12</b><br>
      <a href="https://adventofcode.com/2023/day/12">Hot Springs</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 13</b><br>
      <a href="https://adventofcode.com/2023/day/13">Point of Incidence</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 14</b><br>
      <a href="https://adventofcode.com/2023/day/14">Parabolic Reflector Dish</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 15</b><br>
      <a href="https://adventofcode.com/2023/day/15">Lens Library</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 16</b><br>
      <a href="https://adventofcode.com/2023/day/16">The Floor Will Be Lava</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 17</b><br>
      <a href="https://adventofcode.com/2023/day/17">Clumsy Crucible</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 18</b><br>
      <a href="https://adventofcode.com/2023/day/18">Lavaduct Lagoon</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 19</b><br>
      <a href="https://adventofcode.com/2023/day/19">Aplenty</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 20</b><br>
      <a href="https://adventofcode.com/2023/day/20">Pulse Propagation</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 21</b><br>
      <a href="https://adventofcode.com/2023/day/21">Step Counter</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 22</b><br>
      <a href="https://adventofcode.com/2023/day/22">Sand Slabs</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 23</b><br>
      <a href="https://adventofcode.com/2023/day/23">A Long Walk</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 24</b><br>
      <a href="https://adventofcode.com/2023/day/24">Never Tell Me The Odds</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 25</b><br>
      <a href="https://adventofcode.com/2023/day/25">Snowverload</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
</table>

</details>

<details>
<summary><b>2024</b> · C# · 50 ⭐</summary>

<table style="text-align: center; width: 1200px;">
  <tr>
    <td>
      <b>Day 1</b><br>
      <a href="https://adventofcode.com/2024/day/1">Historian Hysteria</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 2</b><br>
      <a href="https://adventofcode.com/2024/day/2">RedNosed Reports</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 3</b><br>
      <a href="https://adventofcode.com/2024/day/3">Mull It Over</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 4</b><br>
      <a href="https://adventofcode.com/2024/day/4">Ceres Search</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 5</b><br>
      <a href="https://adventofcode.com/2024/day/5">Print Queue</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 6</b><br>
      <a href="https://adventofcode.com/2024/day/6">Guard Gallivant</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 7</b><br>
      <a href="https://adventofcode.com/2024/day/7">Bridge Repair</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 8</b><br>
      <a href="https://adventofcode.com/2024/day/8">Resonant Collinearity</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 9</b><br>
      <a href="https://adventofcode.com/2024/day/9">Disk Fragmenter</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 10</b><br>
      <a href="https://adventofcode.com/2024/day/10">Hoof It</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 11</b><br>
      <a href="https://adventofcode.com/2024/day/11">Plutonian Pebbles</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 12</b><br>
      <a href="https://adventofcode.com/2024/day/12">Garden Groups</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 13</b><br>
      <a href="https://adventofcode.com/2024/day/13">Claw Contraption</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 14</b><br>
      <a href="https://adventofcode.com/2024/day/14">Restroom Redoubt</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 15</b><br>
      <a href="https://adventofcode.com/2024/day/15">Warehouse Woes</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 16</b><br>
      <a href="https://adventofcode.com/2024/day/16">Reindeer Maze</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 17</b><br>
      <a href="https://adventofcode.com/2024/day/17">Chronospatial Computer</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 18</b><br>
      <a href="https://adventofcode.com/2024/day/18">RAM Run</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 19</b><br>
      <a href="https://adventofcode.com/2024/day/19">Linen Layout</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 20</b><br>
      <a href="https://adventofcode.com/2024/day/20">Race Condition</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 21</b><br>
      <a href="https://adventofcode.com/2024/day/21">Keypad Conundrum</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 22</b><br>
      <a href="https://adventofcode.com/2024/day/22">Monkey Market</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 23</b><br>
      <a href="https://adventofcode.com/2024/day/23">LAN Party</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 24</b><br>
      <a href="https://adventofcode.com/2024/day/24">Crossed Wires</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 25</b><br>
      <a href="https://adventofcode.com/2024/day/25">Code Chronicle</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
</table>

</details>

<details>
<summary><b>2025</b> · Elixir · 24 ⭐</summary>

<table style="text-align: center; width: 1200px;">
  <tr>
    <td>
      <b>Day 1</b><br>
      <a href="https://adventofcode.com/2025/day/1">Secret Entrance</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 2</b><br>
      <a href="https://adventofcode.com/2025/day/2">Gift Shop</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 3</b><br>
      <a href="https://adventofcode.com/2025/day/3">Lobby</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 4</b><br>
      <a href="https://adventofcode.com/2025/day/4">Printing Department</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 5</b><br>
      <a href="https://adventofcode.com/2025/day/5">Cafeteria</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 6</b><br>
      <a href="https://adventofcode.com/2025/day/6">Trash Compactor</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
  <tr>
    <td>
      <b>Day 7</b><br>
      <a href="https://adventofcode.com/2025/day/7">Laboratories</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 8</b><br>
      <a href="https://adventofcode.com/2025/day/8">Playground</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 9</b><br>
      <a href="https://adventofcode.com/2025/day/9">Movie Theater</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 10</b><br>
      <a href="https://adventofcode.com/2025/day/10">Factory</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 11</b><br>
      <a href="https://adventofcode.com/2025/day/11">Reactor</a><br>
      <span>⭐⭐</span>
    </td>
    <td>
      <b>Day 12</b><br>
      <a href="https://adventofcode.com/2025/day/12">Christmas Tree Farm</a><br>
      <span>⭐⭐</span>
    </td>
  </tr>
</table>

</details>
