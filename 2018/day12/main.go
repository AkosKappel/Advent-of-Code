package day12

import (
	"fmt"
	"os"
	"strings"
	"time"
)

const EMPTY = "."
const PLANT = '#'

func parse(s string) (initialState string, rules map[string]string) {
	sections := strings.SplitAfterN(s, "\n", 2)
	_, _ = fmt.Sscanf(strings.TrimSpace(sections[0]), "initial state: %s", &initialState)

	rules = make(map[string]string)

	for _, rule := range strings.Split(strings.TrimSpace(sections[1]), "\n") {
		parts := strings.Split(rule, " => ")
		lhs := strings.TrimSpace(parts[0])
		rhs := strings.TrimSpace(parts[1])
		rules[lhs] = rhs
	}

	return
}

func Part1(input string) int {
	const generations = 20
	padding := strings.Repeat(EMPTY, 3)
	startIndex := 0

	pots, rules := parse(input)
	pots = padding + pots + padding
	startIndex -= 3

	for i := 0; i < generations; i++ {
		nextState := strings.Builder{}
		for j := 2; j < len(pots)-2; j++ {
			pot := pots[j-2 : j+3]
			if rule, ok := rules[pot]; ok {
				nextState.WriteString(rule)
			} else {
				nextState.WriteString(EMPTY)
			}
		}

		pots = padding + nextState.String() + padding
		startIndex -= 1
	}

	sum := 0
	for i, pot := range pots {
		if pot == PLANT {
			sum += i + startIndex
		}
	}

	return sum
}

func Part2(input string) int {
	const generations = 50_000_000_000
	return 0
}

func Run() {
	data, err := os.ReadFile("day12/input.txt")
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
