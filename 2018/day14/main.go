package day14

import (
	"fmt"
	"strconv"
	"strings"
	"time"
)

const initialRecipes = "37"

func generateNewRecipes(recipes *[]rune, elves *[]int) (newRecipes []rune) {
	combined := 0
	for _, elf := range *elves {
		combined += int((*recipes)[elf] - '0')
	}

	newRecipes = []rune(strconv.Itoa(combined))
	return
}

func Part1(input int) string {
	recipes := []rune(initialRecipes)
	elves := []int{0, 1}

	numToGenerate := input + 10

	for len(recipes) < numToGenerate {
		recipes = append(recipes, generateNewRecipes(&recipes, &elves)...)

		for j, elf := range elves {
			elves[j] = (elf + int(recipes[elf]-'0') + 1) % len(recipes)
		}
	}

	return string(recipes[input:numToGenerate])
}

func Part2(input string) int {
	recipes := []rune(initialRecipes)
	elves := []int{0, 1}

	for {
		recipes = append(recipes, generateNewRecipes(&recipes, &elves)...)

		for j, elf := range elves {
			elves[j] = (elf + int(recipes[elf]-'0') + 1) % len(recipes)
		}

		lastFewRecipes := recipes[max(0, len(recipes)-len(input)-10):]
		if strings.Contains(string(lastFewRecipes), input) {
			return strings.Index(string(recipes), input)
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
