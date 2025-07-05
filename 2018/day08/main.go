package day08

import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

func parse(s string) ([]int, error) {
	var result []int

	lines := strings.FieldsFunc(s, func(r rune) bool {
		return r == ',' || r == '\n'
	})

	for _, line := range lines {
		line = strings.TrimSpace(line)
		if line == "" {
			continue // skip empty lines
		}

		n, err := strconv.Atoi(line)
		if err != nil {
			return nil, err // fail if the line isn't a valid signed int
		}

		result = append(result, n)
	}

	return result, nil
}

func Part1(input string) int {
	return 0
}

func Part2(input string) int {
	return 0
}

func Run() {
	data, err := os.ReadFile("day08/input.txt")
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
