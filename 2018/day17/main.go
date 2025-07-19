package day17

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
	"time"
)

const (
	Clay         rune = '#'
	Sand         rune = '.'
	SettledWater rune = '~'
	FlowingWater rune = '|'
	Spring       rune = '+'
)

type Point struct{ x, y int }

var grid map[Point]rune
var minY, maxY int

func parse(input string) {
	grid = make(map[Point]rune)
	minY = 1 << 30
	maxY = 0

	re := regexp.MustCompile(`([xy])=(\d+), ([xy])=(\d+)\.\.(\d+)`)
	for _, line := range strings.Split(strings.TrimSpace(input), "\n") {
		matches := re.FindStringSubmatch(line)
		a1, _ := strconv.Atoi(matches[2])
		a2, _ := strconv.Atoi(matches[4])
		a3, _ := strconv.Atoi(matches[5])

		for i := a2; i <= a3; i++ {
			var p Point
			if matches[1] == "x" {
				p = Point{a1, i}
			} else {
				p = Point{i, a1}
			}
			grid[p] = Clay
			if p.y < minY {
				minY = p.y
			}
			if p.y > maxY {
				maxY = p.y
			}
		}
	}
}

func set(p Point, r rune) {
	if _, ok := grid[p]; !ok {
		grid[p] = r
	}
}

func get(p Point) rune {
	if r, ok := grid[p]; ok {
		return r
	}
	return Sand
}

func fill(p Point) {
	if p.y > maxY {
		return
	}

	below := Point{p.x, p.y + 1}
	if get(below) == Sand {
		set(below, FlowingWater)
		fill(below)
	}

	if get(below) != Clay && get(below) != SettledWater {
		return
	}

	leftBound, rightBound := p.x, p.x
	blockedLeft, blockedRight := false, false

	// go left
	for {
		left := Point{leftBound - 1, p.y}
		belowLeft := Point{left.x, left.y + 1}
		if get(left) == Clay {
			blockedLeft = true
			break
		}
		if get(left) != FlowingWater {
			set(left, FlowingWater)
		}
		if get(belowLeft) == Sand {
			set(belowLeft, FlowingWater)
			fill(belowLeft)
		}
		if get(belowLeft) != Clay && get(belowLeft) != SettledWater {
			break
		}
		leftBound--
	}

	// go right
	for {
		right := Point{rightBound + 1, p.y}
		belowRight := Point{right.x, right.y + 1}
		if get(right) == Clay {
			blockedRight = true
			break
		}
		if get(right) != FlowingWater {
			set(right, FlowingWater)
		}
		if get(belowRight) == Sand {
			set(belowRight, FlowingWater)
			fill(belowRight)
		}
		if get(belowRight) != Clay && get(belowRight) != SettledWater {
			break
		}
		rightBound++
	}

	// Fill with settled water if bounded both sides
	if blockedLeft && blockedRight {
		for x := leftBound; x <= rightBound; x++ {
			grid[Point{x, p.y}] = SettledWater
		}
		fill(Point{p.x, p.y - 1}) // go up to settle above
	}
}

func Part1(input string) int {
	parse(input)
	source := Point{500, 0}
	set(source, Spring)
	fill(source)

	count := 0
	for p, r := range grid {
		if p.y >= minY && p.y <= maxY && (r == FlowingWater || r == SettledWater) {
			count++
		}
	}
	return count
}

func Part2(input string) int {
	parse(input)
	source := Point{500, 0}
	set(source, Spring)
	fill(source)

	count := 0
	for p, r := range grid {
		if p.y >= minY && p.y <= maxY && r == SettledWater {
			count++
		}
	}
	return count
}

func Run() {
	data, err := os.ReadFile("day17/input.txt")
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
