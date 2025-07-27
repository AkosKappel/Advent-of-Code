package day20

import (
	"fmt"
	"os"
	"time"
)

type point struct{ x, y int }

var dirs = map[byte]point{
	'N': {0, -1},
	'S': {0, 1},
	'E': {1, 0},
	'W': {-1, 0},
}

func parse(s string) map[point][]point {
	graph := make(map[point][]point)
	var stack []point
	curr := point{0, 0}

	for _, c := range s {
		switch c {
		case 'N', 'S', 'E', 'W':
			d := dirs[byte(c)]
			next := point{curr.x + d.x, curr.y + d.y}
			graph[curr] = append(graph[curr], next)
			graph[next] = append(graph[next], curr)
			curr = next
		case '(':
			stack = append(stack, curr)
		case '|':
			curr = stack[len(stack)-1]
		case ')':
			stack = stack[:len(stack)-1]
		case '^', '$': // skip ^ and $
			continue
		default:
			panic("unexpected character: " + string(c))
		}
	}

	return graph
}

func bfs(graph map[point][]point, start point) map[point]int {
	dist := make(map[point]int)
	queue := []point{start}
	dist[start] = 0

	for len(queue) > 0 {
		curr := queue[0]
		queue = queue[1:]

		for _, neighbor := range graph[curr] {
			if _, seen := dist[neighbor]; !seen {
				dist[neighbor] = dist[curr] + 1
				queue = append(queue, neighbor)
			}
		}
	}

	return dist
}

func Part1(input string) int {
	graph := parse(input)
	dist := bfs(graph, point{0, 0})

	maxDist := 0
	for _, d := range dist {
		if d > maxDist {
			maxDist = d
		}
	}

	return maxDist
}

func Part2(input string) int {

}

func Run() {
	data, err := os.ReadFile("day20/input.txt")
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
