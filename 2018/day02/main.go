package day02

import (
	"fmt"
	"os"
	"strings"
	"time"
)

func parse(s string) []string {
	lines := strings.Split(s, "\n")
	result := make([]string, 0, len(lines))
	for _, line := range lines {
		line = strings.TrimSpace(line)
		if line != "" {
			result = append(result, line)
		}
	}
	return result
}

func Part1(input string) int {
	lines := parse(input)

	twoSameLetters, threeSameLetters := 0, 0

	for _, line := range lines {
		freq := make(map[rune]int)
		for _, c := range line {
			freq[c]++
		}

		for _, v := range freq {
			if v == 2 {
				twoSameLetters++
				break
			}
		}

		for _, v := range freq {
			if v == 3 {
				threeSameLetters++
				break
			}
		}
	}

	return twoSameLetters * threeSameLetters
}

func Part2(input string) int {
	return 0
}

func Run() {
	data, err := os.ReadFile("day02/input.txt")
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
