package day22

import (
	"fmt"
	"os"
	"strings"
	"time"
)

var depth int
var targetX, targetY int

var erosionLevel map[[2]int]int

func parse(input string) {
	lines := strings.Split(strings.TrimSpace(input), "\n")

	for _, line := range lines {
		if strings.HasPrefix(line, "depth:") {
			_, err := fmt.Sscanf(line, "depth: %d", &depth)
			if err != nil {
				panic(err)
			}
			continue
		}

		if strings.HasPrefix(line, "target:") {
			_, err := fmt.Sscanf(line, "target: %d,%d", &targetX, &targetY)
			if err != nil {
				panic(err)
			}
			continue
		}
	}

	erosionLevel = make(map[[2]int]int)
}

func geoIndex(x, y int) int {
	if x == 0 && y == 0 {
		return 0
	}
	if x == targetX && y == targetY {
		return 0
	}
	if y == 0 {
		return x * 16807
	}
	if x == 0 {
		return y * 48271
	}
	return getErosion(x-1, y) * getErosion(x, y-1)
}

func getErosion(x, y int) int {
	key := [2]int{x, y}
	if val, exists := erosionLevel[key]; exists {
		return val
	}
	e := (geoIndex(x, y) + depth) % 20183
	erosionLevel[key] = e
	return e
}

func getType(x, y int) int {
	return getErosion(x, y) % 3
}

func Part1(input string) int {
	parse(input)

	sum := 0
	for y := 0; y <= targetY; y++ {
		for x := 0; x <= targetX; x++ {
			sum += getType(x, y)
		}
	}

	return sum
}

func Part2(input string) int {
	return 0
}

func Run() {
	data, err := os.ReadFile("day22/input.txt")
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
