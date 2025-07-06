package day11

import (
	"fmt"
	"math"
	"time"
)

const size = 300

func createGrid(size int) [][]int {
	grid := make([][]int, size)
	for i := range grid {
		grid[i] = make([]int, size)
	}
	return grid
}

func populateGrid(grid [][]int, gridSerialNumber int) {
	for i := 0; i < size; i++ {
		for j := 0; j < size; j++ {
			x, y := j+1, i+1

			rackId := x + 10
			powerLevel := rackId * y
			powerLevel += gridSerialNumber
			powerLevel *= rackId
			powerLevel = powerLevel / 100 % 10
			powerLevel -= 5

			grid[i][j] = powerLevel
		}
	}
}

func reduceGrid(grid [][]int, reductionSize int) [][]int {
	reducedSize := size - reductionSize + 1
	reducedGrid := createGrid(reducedSize)

	for i := 0; i < reducedSize; i++ {
		for j := 0; j < reducedSize; j++ {
			reducedGrid[i][j] = 0
			for k := 0; k < reductionSize; k++ {
				for l := 0; l < reductionSize; l++ {
					reducedGrid[i][j] += grid[i+k][j+l]
				}
			}
		}
	}

	return reducedGrid
}

func findMax(grid [][]int) (x, y, power int) {
	size := len(grid)

	for i := 0; i < size; i++ {
		for j := 0; j < size; j++ {
			if grid[i][j] > power {
				power = grid[i][j]
				x, y = j+1, i+1
			}
		}
	}

	return
}

func Part1(input int) (x, y, power int) {
	grid := createGrid(size)
	populateGrid(grid, input)
	accGrid := reduceGrid(grid, 3)
	return findMax(accGrid)
}

func buildSummedAreaTable(grid [][]int) [][]int {
	n := len(grid)
	sum := make([][]int, n)
	for i := range sum {
		sum[i] = make([]int, n)
	}
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			s := grid[i][j]
			if i > 0 {
				s += sum[i-1][j]
			}
			if j > 0 {
				s += sum[i][j-1]
			}
			if i > 0 && j > 0 {
				s -= sum[i-1][j-1]
			}
			sum[i][j] = s
		}
	}
	return sum
}

func getSquareSum(sum [][]int, x, y, size int) int {
	x2, y2 := x+size-1, y+size-1
	res := sum[y2][x2]
	if x > 0 {
		res -= sum[y2][x-1]
	}
	if y > 0 {
		res -= sum[y-1][x2]
	}
	if x > 0 && y > 0 {
		res += sum[y-1][x-1]
	}
	return res
}

func Part2(input int) (bestX, bestY, bestSize int) {
	grid := createGrid(size)
	populateGrid(grid, input)
	sum := buildSummedAreaTable(grid)

	maxPower := math.MinInt
	for reductionSize := 1; reductionSize <= size; reductionSize++ {
		for y := 0; y <= size-reductionSize; y++ {
			for x := 0; x <= size-reductionSize; x++ {
				power := getSquareSum(sum, x, y, reductionSize)
				if power > maxPower {
					maxPower = power
					bestX, bestY = x+1, y+1
					bestSize = reductionSize
				}
			}
		}
	}
	return
}

func Run() {
	input := 7165

	startPart1 := time.Now()
	part1X, part1Y, answerPart1 := Part1(input)
	endPart1 := time.Now()
	fmt.Printf("Part 1: %v [%v,%v] (%d ms)\n", answerPart1, part1X, part1Y, endPart1.Sub(startPart1).Milliseconds())

	startPart2 := time.Now()
	part2X, part2Y, answerPart2 := Part2(input)
	endPart2 := time.Now()
	fmt.Printf("Part 2: %v [%v,%v] (%d ms)\n", answerPart2, part2X, part2Y, endPart2.Sub(startPart2).Milliseconds())
}
