package day13

import (
	"fmt"
	"os"
	"sort"
	"strings"
	"time"
)

// Directions
const (
	Up    rune = '^'
	Right rune = '>'
	Down  rune = 'v'
	Left  rune = '<'
)

// Turns
const (
	GoLeft = iota
	GoStraight
	GoRight
)

// Roads
const (
	Horizontal = '-'
	Vertical   = '|'
	Intersect  = '+'
	Empty      = ' '
	Slash      = '/'
	Backslash  = '\\'
	Collision  = 'X'
)

type Cart struct {
	x, y int
	dir  rune
	turn int
}

func parse(s string) ([]string, []Cart) {
	lines := strings.Split(s, "\n")

	var grid []string
	var carts []Cart

	maxLength := 0
	for _, line := range lines {
		length := len(strings.TrimSpace(line))
		if length > maxLength {
			maxLength = length
		}
	}

	for y, line := range lines {
		trimmed := strings.TrimRight(line, "\n\r")
		if len(trimmed) == 0 {
			continue
		}

		// add padding
		row := []rune(trimmed)
		for len(row) < maxLength {
			row = append(row, Empty)
		}

		for x, c := range row {
			if c == Left || c == Right || c == Up || c == Down {
				cart := Cart{x, y, c, GoLeft}
				carts = append(carts, cart)
			}

			switch c {
			case Left, Right:
				row[x] = Horizontal
			case Up, Down:
				row[x] = Vertical
			}
		}

		grid = append(grid, string(row))
	}

	return grid, carts
}

func turnRight(cart *Cart) {
	switch cart.dir {
	case Up:
		cart.dir = Right
	case Right:
		cart.dir = Down
	case Down:
		cart.dir = Left
	case Left:
		cart.dir = Up
	}
}

func turnLeft(cart *Cart) {
	switch cart.dir {
	case Up:
		cart.dir = Left
	case Right:
		cart.dir = Up
	case Down:
		cart.dir = Right
	case Left:
		cart.dir = Down
	}
}

func turnOnSlash(cart *Cart) {
	switch cart.dir {
	case Up:
		cart.dir = Right
	case Right:
		cart.dir = Up
	case Down:
		cart.dir = Left
	case Left:
		cart.dir = Down
	}
}

func turnOnBackslash(cart *Cart) {
	switch cart.dir {
	case Up:
		cart.dir = Left
	case Right:
		cart.dir = Down
	case Down:
		cart.dir = Right
	case Left:
		cart.dir = Up
	}
}

func turnOnIntersect(cart *Cart) {
	switch cart.turn {
	case GoLeft:
		turnLeft(cart)
		cart.turn = GoStraight
	case GoStraight:
		cart.turn = GoRight
	case GoRight:
		turnRight(cart)
		cart.turn = GoLeft
	}
}

func move(cart *Cart, grid *[]string) {
	switch cart.dir {
	case Up:
		cart.y--
	case Right:
		cart.x++
	case Down:
		cart.y++
	case Left:
		cart.x--
	}

	switch rune((*grid)[cart.y][cart.x]) {
	case Slash:
		turnOnSlash(cart)
	case Backslash:
		turnOnBackslash(cart)
	case Intersect:
		turnOnIntersect(cart)
	}
}

func displayState(grid *[]string, carts *[]Cart) {
	state := make([]string, len(*grid))
	for i := range state {
		state[i] = (*grid)[i]
	}

	for _, cart := range *carts {
		state[cart.y] = state[cart.y][:cart.x] + string(cart.dir) + state[cart.y][cart.x+1:]
	}

	fmt.Println(strings.Join(state, "\n"))
}

func Part1(input string) string {
	grid, carts := parse(input)
	numCarts := len(carts)

	tick := 0

	for {
		// sort the carts by y, then x
		sort.Slice(carts, func(i, j int) bool {
			if carts[i].y == carts[j].y {
				return carts[i].x < carts[j].x
			}
			return carts[i].y < carts[j].y
		})

		for i := 0; i < numCarts; i++ {
			cart := &carts[i]
			move(cart, &grid)

			// check for collision with other carts
			for j := 0; j < numCarts; j++ {
				otherCart := &carts[j]
				if i != j && cart.x == otherCart.x && cart.y == otherCart.y {
					return fmt.Sprintf("%d,%d", cart.x, cart.y)
				}
			}
		}

		tick++
	}
}

func Part2(input string) int {
	return 0
}

func Run() {
	//data, err := os.ReadFile("day13/example.txt")
	data, err := os.ReadFile("day13/input.txt")
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
