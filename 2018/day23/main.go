package day23

import (
	"fmt"
	"os"
	"strings"
	"time"
)

type NanoBot struct {
	pos [3]int
	r   int
}

func parse(s string) []NanoBot {
	var nanoBots []NanoBot

	lines := strings.Split(strings.TrimSpace(s), "\n")
	for _, line := range lines {
		var x, y, z, r int
		_, err := fmt.Sscanf(line, "pos=<%d,%d,%d>, r=%d", &x, &y, &z, &r)
		if err != nil {
			panic(err)
		}
		nanoBots = append(nanoBots, NanoBot{[3]int{x, y, z}, r})
	}

	return nanoBots
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

func manhattanDistance(a, b [3]int) int {
	return abs(a[0]-b[0]) + abs(a[1]-b[1]) + abs(a[2]-b[2])
}

func Part1(input string) int {
	nanoBots := parse(input)

	// find the bot with the largest radius
	var largest = &nanoBots[0]
	for _, bot := range nanoBots {
		if bot.r > largest.r {
			largest = &bot
		}
	}

	// count the number of bots within the radius of the largest bot
	count := 0
	for _, bot := range nanoBots {
		if manhattanDistance(largest.pos, bot.pos) <= largest.r {
			count++
		}
	}

	return count
}

func Part2(input string) int {
	return 0
}

func Run() {
	data, err := os.ReadFile("day23/input.txt")
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
