package day18

import (
	"fmt"
	"os"
	"strings"
	"time"
)

const (
	Ground     rune = '.'
	Tree       rune = '|'
	Lumberyard rune = '#'
)

type Grid struct {
	Area          [][]rune
	Height, Width int
}

func (g *Grid) Get(x, y int) rune {
	if 0 <= x && x < g.Width && 0 <= y && y < g.Height {
		return g.Area[y][x]
	}
	return Ground
}

func (g *Grid) Set(x, y int, r rune) {
	if 0 <= x && x < g.Width && 0 <= y && y < g.Height {
		g.Area[y][x] = r
	}
}

func (g *Grid) Count(r rune) int {
	count := 0
	for _, row := range g.Area {
		for _, cell := range row {
			if cell == r {
				count++
			}
		}
	}
	return count
}

func (g *Grid) Neighbors(x, y int) []rune {
	var neighbors []rune
	for i := -1; i <= 1; i++ {
		for j := -1; j <= 1; j++ {
			if i == 0 && j == 0 {
				continue
			}
			neighbors = append(neighbors, g.Get(x+i, y+j))
		}
	}
	return neighbors
}

func (g *Grid) String() string {
	s := strings.Builder{}
	for _, row := range g.Area {
		for _, cell := range row {
			s.WriteRune(cell)
		}
		s.WriteRune('\n')
	}
	return s.String()
}

func parse(s string) *Grid {
	lines := strings.Split(strings.TrimSpace(s), "\n")

	height := len(lines)
	width := len(strings.TrimSpace(lines[0]))
	area := make([][]rune, height)

	for i, line := range lines {
		area[i] = []rune(strings.TrimSpace(line))
	}

	return &Grid{Area: area, Height: height, Width: width}
}

func evolve(g *Grid) *Grid {
	newArea := make([][]rune, g.Height)
	for i := range newArea {
		newArea[i] = make([]rune, g.Width)
	}

	for i := 0; i < g.Height; i++ {
		for j := 0; j < g.Width; j++ {
			lumberyards, trees, ground := 0, 0, 0
			for _, neighbor := range g.Neighbors(j, i) {
				switch neighbor {
				case Lumberyard:
					lumberyards++
				case Tree:
					trees++
				case Ground:
					ground++
				}
			}

			switch g.Get(j, i) {
			case Ground:
				if trees >= 3 {
					newArea[i][j] = Tree
				} else {
					newArea[i][j] = Ground
				}
			case Tree:
				if lumberyards >= 3 {
					newArea[i][j] = Lumberyard
				} else {
					newArea[i][j] = Tree
				}
			case Lumberyard:
				if trees >= 1 && lumberyards >= 1 {
					newArea[i][j] = Lumberyard
				} else {
					newArea[i][j] = Ground
				}
			}
		}
	}

	return &Grid{Area: newArea, Height: g.Height, Width: g.Width}
}

func Part1(input string) int {
	const minutes = 10
	grid := parse(input)

	for minute := 0; minute < minutes; minute++ {
		grid = evolve(grid)
	}

	return grid.Count(Lumberyard) * grid.Count(Tree)
}

func Part2(input string) int {
	const minutes = 1_000_000_000
	grid := parse(input)
	seen := map[string]int{}
	minute := 0

	for minute < minutes {
		state := grid.String()
		if prev, ok := seen[state]; ok {
			period := minute - prev
			remaining := minutes - minute
			repeat := remaining / period
			minute += repeat * period
			remaining %= period
		}
		seen[state] = minute
		minute++
		grid = evolve(grid)
	}

	return grid.Count(Lumberyard) * grid.Count(Tree)
}

func Run() {
	data, err := os.ReadFile("day18/input.txt")
	if err != nil {
		panic(err)
	}

	input := string(data)

	startPart1 := time.Now()
	answerPart1 := Part1(input)
	endPart1 := time.Now()
	fmt.Printf("Part 1: %v (%d ms)\n", answerPart1, endPart1.Sub(startPart1).Milliseconds())

	startPart2 := time.Now()
	answerPart2 := Part2(input)
	endPart2 := time.Now()
	fmt.Printf("Part 2: %v (%d ms)\n", answerPart2, endPart2.Sub(startPart2).Milliseconds())
}
