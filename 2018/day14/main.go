package day14

import (
	"fmt"
	"strconv"
	"time"
)

const initialRecipes = "37"

func hasPatternAtEnd(recipes []rune, pattern []rune) bool {
	patternLength := len(pattern)
	recipesLength := len(recipes)

	if recipesLength < patternLength {
		return false
	}

	for i := 0; i < patternLength; i++ {
		if recipes[recipesLength-patternLength+i] != pattern[i] {
			return false
		}
	}

	return true
}

func Part1(input int) string {
	recipes := []rune(initialRecipes)
	elves := []int{0, 1}

	numToGenerate := input + 10

	for len(recipes) < numToGenerate {
		combined := 0
		for _, elf := range elves {
			combined += int(recipes[elf] - '0')
		}

		newRecipes := []rune(strconv.Itoa(combined))
		recipes = append(recipes, newRecipes...)

		for j, elf := range elves {
			elves[j] = (elf + int(recipes[elf]-'0') + 1) % len(recipes)
		}
	}

	return string(recipes[input:numToGenerate])
}

func Part2(input string) int {
	recipes := []rune(initialRecipes)
	elves := []int{0, 1}

	pattern := []rune(input)
	patternLength := len(pattern)

	for {
		// compute combined and new recipes
		combined := 0
		for _, elf := range elves {
			combined += int(recipes[elf] - '0')
		}

		if combined >= 10 {
			// add first recipe
			recipes = append(recipes, rune('0'+combined/10))

			// check after adding one recipe
			if hasPatternAtEnd(recipes, pattern) {
				return len(recipes) - patternLength
			}
		}

		// add second recipe
		recipes = append(recipes, rune('0'+combined%10))

		// check after adding second recipe
		if hasPatternAtEnd(recipes, pattern) {
			return len(recipes) - patternLength
		}

		// move elves
		for j, elf := range elves {
			elves[j] = (elf + int(recipes[elf]-'0') + 1) % len(recipes)
		}
	}
}

func Run() {
	input := 704321

	startPart1 := time.Now()
	answerPart1 := Part1(input)
	endPart1 := time.Now()
	fmt.Printf("Part 1: %v (%d ms)\n", answerPart1, endPart1.Sub(startPart1).Milliseconds())

	startPart2 := time.Now()
	answerPart2 := Part2(strconv.Itoa(input))
	endPart2 := time.Now()
	fmt.Printf("Part 2: %v (%d ms)\n", answerPart2, endPart2.Sub(startPart2).Milliseconds())
}
