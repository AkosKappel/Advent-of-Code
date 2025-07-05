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

func Part2(input string) string {
	lines := parse(input)

	for i := 0; i < len(lines); i++ {
		for j := i + 1; j < len(lines); j++ {
			line1, line2 := lines[i], lines[j]

			diffCound, diffIndex := 0, -1
			for k := 0; k < len(line1); k++ {
				if line1[k] != line2[k] {
					if diffIndex == -1 {
						diffIndex = k
					}
					diffCound++
				}
				if diffCound > 1 {
					break
				}
			}

			if diffCound == 1 {
				return line1[:diffIndex] + line1[diffIndex+1:]
			}
		}
	}

	return ""
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
