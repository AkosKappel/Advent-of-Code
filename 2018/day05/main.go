package day05

import (
	"fmt"
	"os"
	"time"
)

func doesReact(a, b rune) bool {
	return a-'A' == b-'a' || a-'a' == b-'A'
}

func Part1(input string) int {
	split := []rune(input)

	reacted := true
	for reacted {
		reacted = false
		for i := 0; i < len(split)-1; i++ {
			if doesReact(split[i], split[i+1]) {
				split = append(split[:i], split[i+2:]...)
				reacted = true
				break
			}
		}
	}

	return len(split)
}

func Part2(input string) int {
	return 0
}

func Run() {
	data, err := os.ReadFile("day05/input.txt")
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
