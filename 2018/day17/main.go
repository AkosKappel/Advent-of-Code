package day17

import (
	"fmt"
	"os"
	"strings"
	"time"
)

const (
	Clay  rune = '#'
	Sand  rune = '.'
	Water rune = '~'
)

type Point struct {
	x, y int
}

func parse(s string) (map[Point]rune, Point) {
	lines := strings.Split(strings.TrimSpace(s), "\n")
	groud := make(map[Point]rune)

	for _, line := range lines {
		var x1, x2, y1, y2 int

		_, err := fmt.Sscanf(line, "x=%d, y=%d..%d", &x1, &y1, &y2)
		if err == nil {
			for y := y1; y <= y2; y++ {
				groud[Point{x1, y}] = Clay
			}
			continue
		}

		_, err = fmt.Sscanf(line, "y=%d, x=%d..%d", &y1, &x1, &x2)
		if err == nil {
			for x := x1; x <= x2; x++ {
				groud[Point{x, y1}] = Clay
			}
			continue
		}
	}

	waterSource := Point{500, 0}
	groud[waterSource] = Water

	return groud, waterSource
}

// DFS from the water source
func flow(groud map[Point]rune, waterSource Point) int {
	toVisit := []Point{waterSource}

	for len(toVisit) > 0 {
		point := toVisit[0]
		toVisit = toVisit[1:]

		if groud[point] != Water {
			groud[point] = Water
		}

		// Flow down
		down := Point{point.x, point.y + 1}
		if _, exists := groud[down]; !exists {
			toVisit = append(toVisit, down)
			continue
		}

		// Flow left
		left := Point{point.x - 1, point.y}
		if groud[left] == Sand {
			toVisit = append(toVisit, left)
			continue
		}

		// Flow right
		right := Point{point.x + 1, point.y}
		if groud[right] == Sand {
			toVisit = append(toVisit, right)
			continue
		}

		// Backpropagate
		toVisit = append(toVisit, Point{point.x, point.y - 1})
	}

	// count water particles
	numWaterParts := 0
	for _, v := range groud {
		if v == Water {
			numWaterParts++
		}
	}

	return numWaterParts
}

func Part1(input string) int {
	groud, source := parse(input)

	return 0
}

func Part2(input string) int {
	return 0
}

func Run() {
	data, err := os.ReadFile("day17/input.txt")
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
