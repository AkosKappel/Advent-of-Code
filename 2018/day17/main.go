package day17

import (
	"fmt"
	"os"
	"strings"
	"time"
)

type Point struct {
	x, y int
}

func parse(s string) (groud map[Point]rune) {
	lines := strings.Split(strings.TrimSpace(s), "\n")

	for _, line := range lines {
		line = strings.TrimSpace(line)

	}
}

func Part1(input string) int {
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
