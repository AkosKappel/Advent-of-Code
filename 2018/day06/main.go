package day06

import (
	"fmt"
	"os"
	"strings"
	"time"
)

type Point struct {
	X int
	Y int
}

func parse(s string) ([]Point, error) {
	lines := strings.Split(s, "\n")
	result := make([]Point, 0, len(lines))

	for _, line := range lines {
		line = strings.TrimSpace(line)
		if line == "" {
			continue // skip empty lines
		}

		var x, y int
		_, err := fmt.Sscanf(line, "%d,%d", &x, &y)
		if err != nil {
			return nil, err // fail if the line isn't a valid point
		}

		result = append(result, Point{x, y})
	}

	return result, nil
}

func getBoundingBox(points []Point) (minX, maxX, minY, maxY int) {
	minX, maxX, minY, maxY = points[0].X, points[0].X, points[0].Y, points[0].Y
	for _, p := range points {
		if p.X < minX {
			minX = p.X
		} else if p.X > maxX {
			maxX = p.X
		}

		if p.Y < minY {
			minY = p.Y
		} else if p.Y > maxY {
			maxY = p.Y
		}
	}

	return minX, maxX, minY, maxY
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func manhattanDistance(p1, p2 Point) int {
	return abs(p1.X-p2.X) + abs(p1.Y-p2.Y)
}

func Part1(input string) int {
	points, err := parse(input)
	if err != nil {
		panic(err)
	}

	// calculate bounding box
	minX, maxX, minY, maxY := getBoundingBox(points)
	width := maxX - minX + 1
	height := maxY - minY + 1

	// create grid
	grid := make([][]int, height)
	for i := range grid {
		grid[i] = make([]int, width)
	}

	sameDistance := -1 // special value for points with the same distance

	// find the closest point for each grid cell
	for y := minY; y <= maxY; y++ {
		for x := minX; x <= maxX; x++ {
			closest := -1
			closestDistance := -1
			for i, p := range points {
				distance := manhattanDistance(Point{x, y}, p)
				if closestDistance == -1 || distance < closestDistance {
					closest = i
					closestDistance = distance
				} else if distance == closestDistance {
					closest = sameDistance
				}
			}
			grid[y-minY][x-minX] = closest
		}
	}

	// edge cells continue to be infinite areas
	infiniteAreas := make(map[int]bool)
	for x := 0; x < width; x++ {
		infiniteAreas[grid[0][x]] = true
		infiniteAreas[grid[height-1][x]] = true
	}
	for y := 0; y < height; y++ {
		infiniteAreas[grid[y][0]] = true
		infiniteAreas[grid[y][width-1]] = true
	}

	// count finite areas
	finiteAreas := make(map[int]int)
	for y := 0; y < height; y++ {
		for x := 0; x < width; x++ {
			cell := grid[y][x]
			if !infiniteAreas[cell] && cell != sameDistance {
				finiteAreas[cell]++
			}
		}
	}

	// find the largest finite area
	maxFiniteArea := 0
	for _, area := range finiteAreas {
		if area > maxFiniteArea {
			maxFiniteArea = area
		}
	}

	return maxFiniteArea
}

func Part2(input string) int {
	return 0
}

func Run() {
	data, err := os.ReadFile("day06/input.txt")
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
