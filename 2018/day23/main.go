package day23

import (
	"container/heap"
	"fmt"
	"math"
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

type Cube struct {
	x, y, z int
	size    int
}

type SearchNode struct {
	cube       Cube
	botCount   int
	distToZero int
}

type PriorityQueue []SearchNode

func (pq *PriorityQueue) Len() int { return len(*pq) }

func (pq *PriorityQueue) Less(i, j int) bool {
	// higher botCount first, then lower dist, then smaller cube size
	if (*pq)[i].botCount != (*pq)[j].botCount {
		return (*pq)[i].botCount > (*pq)[j].botCount
	}
	if (*pq)[i].distToZero != (*pq)[j].distToZero {
		return (*pq)[i].distToZero < (*pq)[j].distToZero
	}
	return (*pq)[i].cube.size < (*pq)[j].cube.size
}

func (pq *PriorityQueue) Swap(i, j int) {
	(*pq)[i], (*pq)[j] = (*pq)[j], (*pq)[i]
}

func (pq *PriorityQueue) Push(x any) {
	*pq = append(*pq, x.(SearchNode))
}

func (pq *PriorityQueue) Pop() any {
	old := *pq
	n := len(old)
	item := old[n-1]
	*pq = old[:n-1]
	return item
}

func cubeDistanceToOrigin(c Cube) int {
	// closest distance from cube to origin (0,0,0)
	dx := max(0, abs(c.x)-0)
	dy := max(0, abs(c.y)-0)
	dz := max(0, abs(c.z)-0)
	return dx + dy + dz
}

func countBotsInRange(c Cube, bots []NanoBot) int {
	count := 0
	for _, b := range bots {
		// closest point in cube to bot
		d := 0
		for i := 0; i < 3; i++ {
			minDist := [3]int{c.x, c.y, c.z}[i]
			maxDist := minDist + c.size - 1
			pi := b.pos[i]
			if pi < minDist {
				d += minDist - pi
			} else if pi > maxDist {
				d += pi - maxDist
			}
		}
		if d <= b.r {
			count++
		}
	}
	return count
}

func Part2(input string) int {
	bots := parse(input)

	// Find bounding box
	minX, maxX := math.MaxInt, math.MinInt
	minY, maxY := math.MaxInt, math.MinInt
	minZ, maxZ := math.MaxInt, math.MinInt

	for _, b := range bots {
		if b.pos[0] < minX {
			minX = b.pos[0]
		}
		if b.pos[0] > maxX {
			maxX = b.pos[0]
		}
		if b.pos[1] < minY {
			minY = b.pos[1]
		}
		if b.pos[1] > maxY {
			maxY = b.pos[1]
		}
		if b.pos[2] < minZ {
			minZ = b.pos[2]
		}
		if b.pos[2] > maxZ {
			maxZ = b.pos[2]
		}
	}

	// Normalize size to power of 2
	size := 1
	for size < max(maxX-minX, maxY-minY, maxZ-minZ) {
		size *= 2
	}

	initial := Cube{minX, minY, minZ, size}
	pq := &PriorityQueue{}
	heap.Init(pq)

	initialNode := SearchNode{
		cube:       initial,
		botCount:   countBotsInRange(initial, bots),
		distToZero: cubeDistanceToOrigin(initial),
	}
	heap.Push(pq, initialNode)

	for pq.Len() > 0 {
		node := heap.Pop(pq).(SearchNode)
		c := node.cube

		// If cube is 1x1x1, it's a point
		if c.size == 1 {
			return node.distToZero
		}

		half := c.size / 2
		for dx := 0; dx < 2; dx++ {
			for dy := 0; dy < 2; dy++ {
				for dz := 0; dz < 2; dz++ {
					nc := Cube{
						x:    c.x + dx*half,
						y:    c.y + dy*half,
						z:    c.z + dz*half,
						size: half,
					}
					node := SearchNode{
						cube:       nc,
						botCount:   countBotsInRange(nc, bots),
						distToZero: cubeDistanceToOrigin(nc),
					}
					heap.Push(pq, node)
				}
			}
		}
	}

	panic("No solution found")
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
