package day22

import (
	"container/heap"
	"fmt"
	"os"
	"strings"
	"time"
)

var depth int
var targetX, targetY int

var erosionLevel map[[2]int]int

func parse(input string) {
	lines := strings.Split(strings.TrimSpace(input), "\n")

	for _, line := range lines {
		if strings.HasPrefix(line, "depth:") {
			_, err := fmt.Sscanf(line, "depth: %d", &depth)
			if err != nil {
				panic(err)
			}
			continue
		}

		if strings.HasPrefix(line, "target:") {
			_, err := fmt.Sscanf(line, "target: %d,%d", &targetX, &targetY)
			if err != nil {
				panic(err)
			}
			continue
		}
	}

	erosionLevel = make(map[[2]int]int)
}

func geoIndex(x, y int) int {
	if x == 0 && y == 0 {
		return 0
	}
	if x == targetX && y == targetY {
		return 0
	}
	if y == 0 {
		return x * 16807
	}
	if x == 0 {
		return y * 48271
	}
	return getErosion(x-1, y) * getErosion(x, y-1)
}

func getErosion(x, y int) int {
	key := [2]int{x, y}
	if val, exists := erosionLevel[key]; exists {
		return val
	}
	e := (geoIndex(x, y) + depth) % 20183
	erosionLevel[key] = e
	return e
}

func getType(x, y int) int {
	return getErosion(x, y) % 3
}

func Part1(input string) int {
	parse(input)

	sum := 0
	for y := 0; y <= targetY; y++ {
		for x := 0; x <= targetX; x++ {
			sum += getType(x, y)
		}
	}

	return sum
}

type QueueItem struct {
	state    State
	priority int
	index    int
}
type PriorityQueue []*QueueItem

func (pq *PriorityQueue) Len() int { return len(*pq) }

func (pq *PriorityQueue) Less(i, j int) bool {
	return (*pq)[i].priority < (*pq)[j].priority
}

func (pq *PriorityQueue) Swap(i, j int) {
	(*pq)[i], (*pq)[j] = (*pq)[j], (*pq)[i]
	(*pq)[i].index = i
	(*pq)[j].index = j
}

func (pq *PriorityQueue) Push(x any) {
	item := x.(*QueueItem)
	item.index = len(*pq)
	*pq = append(*pq, item)
}

func (pq *PriorityQueue) Pop() any {
	old := *pq
	n := len(old)
	item := old[n-1]
	item.index = -1
	*pq = old[0 : n-1]
	return item
}

const ( // tools
	Torch   = 0
	Gear    = 1
	Neither = 2
)

const ( // regions
	Rocky  = 0
	Wet    = 1
	Narrow = 2
)

type State struct {
	x, y int
	tool int
}

var directions = [][2]int{
	{0, -1}, // up
	{0, 1},  // down
	{-1, 0}, // left
	{1, 0},  // right
}

var regionTools = map[int][]int{
	Rocky:  {Torch, Gear},
	Wet:    {Gear, Neither},
	Narrow: {Torch, Neither},
}

func Part2(input string) int {
	parse(input)

	start := State{0, 0, Torch}
	target := State{targetX, targetY, Torch}

	pq := &PriorityQueue{}
	heap.Init(pq)
	heap.Push(pq, &QueueItem{state: start, priority: 0})

	visited := make(map[State]int)

	for pq.Len() > 0 {
		item := heap.Pop(pq).(*QueueItem)
		cur := item.state
		timeTaken := item.priority

		if prev, seen := visited[cur]; seen && timeTaken >= prev {
			continue
		}
		visited[cur] = timeTaken

		if cur == target {
			return timeTaken
		}

		curRegion := getType(cur.x, cur.y)

		// Try switching tools
		for _, tool := range regionTools[curRegion] {
			if tool != cur.tool {
				newState := State{cur.x, cur.y, tool}
				heap.Push(pq, &QueueItem{state: newState, priority: timeTaken + 7})
			}
		}

		// Try moving in all directions
		for _, dir := range directions {
			nx, ny := cur.x+dir[0], cur.y+dir[1]
			if nx < 0 || ny < 0 {
				continue
			}
			nextRegion := getType(nx, ny)

			// Check if current tool is allowed in both current and next region
			if !toolAllowedIn(cur.tool, nextRegion) {
				continue
			}

			newState := State{nx, ny, cur.tool}
			heap.Push(pq, &QueueItem{state: newState, priority: timeTaken + 1})
		}
	}

	panic("No path found")
}

func toolAllowedIn(tool, regionType int) bool {
	for _, t := range regionTools[regionType] {
		if t == tool {
			return true
		}
	}
	return false
}

func Run() {
	data, err := os.ReadFile("day22/input.txt")
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
