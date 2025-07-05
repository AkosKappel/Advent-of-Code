package day03

import (
	"fmt"
	"os"
	"strings"
	"time"
)

type Claim struct {
	ID     int
	X      int
	Y      int
	Width  int
	Height int
}

func parse(s string) ([]Claim, error) {
	lines := strings.Split(s, "\n")
	result := make([]Claim, 0, len(lines))

	for _, line := range lines {
		line = strings.TrimSpace(line)
		if line == "" {
			continue // skip empty lines
		}

		claim := Claim{}
		_, err := fmt.Sscanf(line, "#%d @ %d,%d: %dx%d", &claim.ID, &claim.X, &claim.Y, &claim.Width, &claim.Height)
		if err != nil {
			return nil, err // fail if the line isn't a valid claim
		}

		result = append(result, claim)
	}

	return result, nil
}

func Part1(input string) int {
	claims, err := parse(input)
	if err != nil {
		panic(err)
	}

	occurences := make(map[string]int)
	for _, claim := range claims {
		for x := claim.X; x < claim.X+claim.Width; x++ {
			for y := claim.Y; y < claim.Y+claim.Height; y++ {
				occurences[fmt.Sprintf("%d,%d", x, y)]++
			}
		}
	}

	multipleClaims := 0
	for _, occurences := range occurences {
		if occurences > 1 {
			multipleClaims++
		}
	}

	return multipleClaims
}

func Part2(input string) int {
	claims, err := parse(input)
	if err != nil {
		panic(err)
	}

	for i, claim := range claims {
		overlaps := false

		for j, otherClaim := range claims {
			if i == j {
				continue
			}

			if overlap(claim, otherClaim) {
				overlaps = true
				break
			}
		}

		if !overlaps {
			return claim.ID
		}
	}

	return -1 // all claims overlap
}

func overlap(c1, c2 Claim) bool {
	return c1.X < c2.X+c2.Width &&
		c1.X+c1.Width > c2.X &&
		c1.Y < c2.Y+c2.Height &&
		c1.Y+c1.Height > c2.Y
}

func Run() {
	data, err := os.ReadFile("day03/input.txt")
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
