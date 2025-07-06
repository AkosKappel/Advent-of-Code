package day12

import (
	"fmt"
	"os"
	"strings"
	"time"
)

const EMPTY rune = '.'
const PLANT rune = '#'

func parse(s string) (pots map[int]rune, rules map[string]rune) {
	lines := strings.Split(s, "\n")
	initialState := strings.TrimSpace(strings.TrimPrefix(lines[0], "initial state: "))

	pots = make(map[int]rune)
	for i, c := range initialState {
		pots[i] = c
	}

	rules = make(map[string]rune)
	for _, line := range lines[1:] {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}

		parts := strings.Split(line, " => ")
		lhs := strings.TrimSpace(parts[0])
		rhs := strings.TrimSpace(parts[1])

		if len(lhs) != 5 || len(rhs) != 1 {
			panic(fmt.Sprintf("invalid rule: %s => %s", lhs, rhs))
		}

		rules[lhs] = rune(rhs[0])
	}

	return pots, rules
}

func minMax(pots map[int]rune) (min, max int) {
	first := true
	for k := range pots {
		if first {
			min, max = k, k
			first = false
		} else {
			if k < min {
				min = k
			}
			if k > max {
				max = k
			}
		}
	}
	return
}

func evolve(pots map[int]rune, rules map[string]rune) map[int]rune {
	newPots := make(map[int]rune)
	minPot, maxPot := minMax(pots)

	for i := minPot - 2; i <= maxPot+2; i++ {
		var sb strings.Builder
		for j := i - 2; j <= i+2; j++ {
			if c, ok := pots[j]; ok {
				sb.WriteRune(c)
			} else {
				sb.WriteRune(EMPTY)
			}
		}
		pattern := sb.String()

		if v, ok := rules[pattern]; ok {
			newPots[i] = v
		} else {
			newPots[i] = EMPTY
		}
	}

	// Remove empty pots
	pots = make(map[int]rune)
	for k, v := range newPots {
		if v == PLANT {
			pots[k] = PLANT
		}
	}

	return pots
}

func sumPots(pots map[int]rune) int {
	sum := 0
	for k := range pots {
		sum += k
	}
	return sum
}

func Part1(input string) int {
	const generations = 20
	pots, rules := parse(input)

	for g := 0; g < generations; g++ {
		pots = evolve(pots, rules)
	}

	return sumPots(pots)
}

func Part2(input string) int {
	const generations = 50_000_000_000
	const minStableCount = 100
	pots, rules := parse(input)

	var lastSum int
	var lastDiff int
	stableCount := 0

	for g := 1; g <= generations; g++ {
		pots = evolve(pots, rules)
		sum := sumPots(pots)
		diff := sum - lastSum

		if diff == lastDiff {
			stableCount++
		} else {
			stableCount = 0
		}

		// Assume the pattern is stable, if it hasn't changed for X generations
		if stableCount > minStableCount {
			remaining := generations - g
			return sum + remaining*diff
		}

		lastSum = sum
		lastDiff = diff
	}

	return sumPots(pots)
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
