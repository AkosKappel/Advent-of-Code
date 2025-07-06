package day10

import (
	"fmt"
	"os"
	"strings"
	"time"
)

const DOT = "#"
const EMPTY = "."

type Point struct {
	PosX int
	PosY int
	VelX int
	VelY int
}

var directions = []struct{ dx, dy int }{
	{1, 0},  // right
	{0, 1},  // down
	{-1, 0}, // left
	{0, -1}, // up
}

func (p *Point) Move(steps int) {
	p.PosX += p.VelX * steps
	p.PosY += p.VelY * steps
}

func parse(s string) []Point {
	lines := strings.Split(s, "\n")
	result := make([]Point, 0, len(lines))

	for _, line := range lines {
		line = strings.TrimSpace(line)
		if line == "" {
			continue // skip empty lines
		}

		var x, y, vx, vy int
		_, err := fmt.Sscanf(line, "position=<%d, %d> velocity=<%d, %d>", &x, &y, &vx, &vy)
		if err != nil {
			panic(err)
		}

		result = append(result, Point{x, y, vx, vy})
	}

	return result
}

func containsLine(points []Point, length int) bool {
	pointSet := make(map[string]bool)
	for _, p := range points {
		pointSet[fmt.Sprintf("%d,%d", p.PosX, p.PosY)] = true
	}

	for _, point := range points {
		for _, dir := range directions {
			foundLength := 1

			for step := 1; step < length; step++ {
				next := fmt.Sprintf("%d,%d", point.PosX+dir.dx*step, point.PosY+dir.dy*step)
				if _, exists := pointSet[next]; exists {
					foundLength++
				} else {
					break // gap found, stop this direction
				}
			}

			if foundLength >= length {
				return true
			}
		}
	}

	return false
}

func getBoundingBox(points []Point) (minX, maxX, minY, maxY int) {
	minX, maxX, minY, maxY = points[0].PosX, points[0].PosX, points[0].PosY, points[0].PosY
	for _, p := range points {
		if p.PosX < minX {
			minX = p.PosX
		} else if p.PosX > maxX {
			maxX = p.PosX
		}

		if p.PosY < minY {
			minY = p.PosY
		} else if p.PosY > maxY {
			maxY = p.PosY
		}
	}

	return minX, maxX, minY, maxY
}

func constructGrid(points []Point) [][]string {
	minX, maxX, minY, maxY := getBoundingBox(points)
	width := maxX - minX + 1
	height := maxY - minY + 1

	grid := make([][]string, height)
	for i := range grid {
		grid[i] = make([]string, width)
		for j := range grid[i] {
			grid[i][j] = EMPTY
		}
	}

	for _, p := range points {
		grid[p.PosY-minY][p.PosX-minX] = DOT
	}

	return grid
}

func Part1(input string) (string, int) {
	points := parse(input)
	maxSteps := 20_000

	for i := 0; i < maxSteps; i++ {
		for j := range points {
			points[j].Move(1)
		}

		if containsLine(points, 8) {
			grid := constructGrid(points)
			image := make([]string, len(grid))
			for i := range image {
				image[i] = strings.Join(grid[i], "")
			}
			return strings.Join(image, "\n"), i + 1
		}
	}

	panic(fmt.Sprintf("no message found after %d steps", maxSteps))
}

func Part2(input string) int {
	_, steps := Part1(input)
	return steps
}

func Run() {
	data, err := os.ReadFile("day10/input.txt")
	if err != nil {
		panic(err)
	}

	input := string(data)

	startPart1 := time.Now()
	answerPart1, _ := Part1(input)
	endPart1 := time.Now()
	fmt.Printf("Part 1:\n%v\n(%d ms)\n", answerPart1, endPart1.Sub(startPart1).Milliseconds())

	startPart2 := time.Now()
	answerPart2 := Part2(input)
	endPart2 := time.Now()
	fmt.Printf("Part 2: %v (%d ms)\n", answerPart2, endPart2.Sub(startPart2).Milliseconds())
}
