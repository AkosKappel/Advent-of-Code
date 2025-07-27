package day25

import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

type Point4D struct {
	x, y, z, w int
}

func manhattan(p1, p2 Point4D) int {
	return abs(p1.x-p2.x) + abs(p1.y-p2.y) + abs(p1.z-p2.z) + abs(p1.w-p2.w)
}

func abs(n int) int {
	if n < 0 {
		return -n
	}
	return n
}

func parse(input string) []Point4D {
	var points []Point4D
	lines := strings.Split(strings.TrimSpace(input), "\n")
	for _, line := range lines {
		parts := strings.Split(strings.TrimSpace(line), ",")
		if len(parts) != 4 {
			continue
		}
		x, _ := strconv.Atoi(parts[0])
		y, _ := strconv.Atoi(parts[1])
		z, _ := strconv.Atoi(parts[2])
		w, _ := strconv.Atoi(parts[3])
		points = append(points, Point4D{x, y, z, w})
	}
	return points
}

func Part1(input string) int {
	points := parse(input)

	n := len(points)
	visited := make([]bool, n)

	constellations := 0

	var dfs func(int)
	dfs = func(idx int) {
		visited[idx] = true
		for i := 0; i < n; i++ {
			if !visited[i] && manhattan(points[idx], points[i]) <= 3 {
				dfs(i)
			}
		}
	}

	for i := 0; i < n; i++ {
		if !visited[i] {
			constellations++
			dfs(i)
		}
	}

	return constellations
}

func Run() {
	data, err := os.ReadFile("day25/input.txt")
	if err != nil {
		panic(err)
	}

	input := string(data)

	startPart1 := time.Now()
	answerPart1 := Part1(input)
	endPart1 := time.Now()
	fmt.Printf("Part 1: %v (%d ms)\n", answerPart1, endPart1.Sub(startPart1).Milliseconds())
}
