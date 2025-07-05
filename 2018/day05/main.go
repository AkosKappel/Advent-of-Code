package day05

import (
	"fmt"
	"os"
	"time"
)

func doesReact(a, b rune) bool {
	return a-'A' == b-'a' || a-'a' == b-'A'
}

func react(polymer []rune) []rune {
	stack := make([]rune, 0, len(polymer))
	for _, c := range polymer {
		if len(stack) > 0 && doesReact(stack[len(stack)-1], c) {
			stack = stack[:len(stack)-1] // remove last
		} else {
			stack = append(stack, c)
		}
	}
	return stack
}

func Part1(input string) int {
	return len(react([]rune(input)))
}

func Part2(input string) int {
	// collect unique types (always lowercase letters)
	types := make(map[rune]struct{})
	for _, c := range input {
		if 'A' <= c && c <= 'Z' {
			types[c+'a'-'A'] = struct{}{}
		} else if 'a' <= c && c <= 'z' {
			types[c] = struct{}{}
		}
	}

	shortest := len(input)
	for t := range types {
		// remove both upper and lower case of t
		modified := make([]rune, 0, len(input))
		for _, c := range input {
			if c == t || c == t+'A'-'a' {
				continue
			}
			modified = append(modified, c)
		}

		// use the fast react function (single-pass stack)
		reacted := react(modified)
		if len(reacted) < shortest {
			shortest = len(reacted)
		}
	}

	return shortest
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
