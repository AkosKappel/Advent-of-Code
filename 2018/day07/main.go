package day07

import (
	"fmt"
	"os"
	"sort"
	"strings"
	"time"
)

func parse(s string) map[rune][]rune {
	lines := strings.Split(s, "\n")
	nodes := make(map[rune][]rune)

	for _, line := range lines {
		line = strings.TrimSpace(line)
		if line == "" {
			continue // skip empty lines
		}

		var dependency, node rune
		_, err := fmt.Sscanf(line, "Step %c must be finished before step %c can begin", &dependency, &node)
		if err != nil {
			panic(err)
		}

		// Make sure both nodes exist in the map, even if empty
		if _, ok := nodes[dependency]; !ok {
			nodes[dependency] = nil
		}
		nodes[node] = append(nodes[node], dependency)
	}

	return nodes
}

func findNoDependencyNodes(graph map[rune][]rune, exclude ...rune) []rune {
	var result []rune

	for node, deps := range graph {
		if len(deps) == 0 {
			skip := false
			for _, excludedNode := range exclude {
				if excludedNode == node {
					skip = true
					break
				}
			}
			if skip {
				continue
			}

			result = append(result, node)
		}
	}

	sort.Slice(result, func(i, j int) bool { return result[i] < result[j] })

	return result
}

func removeNode(graph map[rune][]rune, node rune) {
	// remove from map
	delete(graph, node)

	// remove from dependencies
	for k, deps := range graph {
		newDeps := make([]rune, 0, len(deps))
		for _, dep := range deps {
			if dep != node {
				newDeps = append(newDeps, dep)
			}
		}
		graph[k] = newDeps
	}
}

func Part1(input string) string {
	nodes := parse(input)
	solution := make([]rune, 0, len(nodes))

	for len(nodes) > 0 {
		// find next node with no dependencies
		resolvedNodes := findNoDependencyNodes(nodes)
		if len(resolvedNodes) == 0 {
			panic("no node without dependencies found")
		}

		// find alphabetically lowest node
		current := resolvedNodes[0]

		// add next step and remove it from the map
		solution = append(solution, current)
		removeNode(nodes, current)
	}

	return string(solution)
}

type Worker struct {
	node rune
	time int
}

func Part2(input string, numWorkers int, baseTime int) (int, string) {
	nodes := parse(input)
	workers := make([]Worker, numWorkers)
	solution := make([]rune, 0, len(nodes))
	clock := 0

	for len(nodes) > 0 {
		// update workers
		for i := range workers {
			if workers[i].node == 0 {
				continue // skip free workers
			}
			if workers[i].time == 0 {
				solution = append(solution, workers[i].node)
				removeNode(nodes, workers[i].node)
				workers[i].node = 0 // release worker
			} else {
				workers[i].time-- // decrease time left
			}
		}

		currentlyProcessedNodes := make([]rune, 0, len(workers))
		for i := range workers {
			if workers[i].node != 0 {
				currentlyProcessedNodes = append(currentlyProcessedNodes, workers[i].node)
			}
		}

		// find next node with no dependencies
		resolvableNodes := findNoDependencyNodes(nodes, currentlyProcessedNodes...)

		// assign to all free workers
		for i := range workers {
			if workers[i].node == 0 && len(resolvableNodes) > 0 {
				workers[i].node = resolvableNodes[0]
				workers[i].time = baseTime + int(workers[i].node) - int('A')
				resolvableNodes = resolvableNodes[1:]
			}
		}

		clock++
	}

	return clock - 1, string(solution)
}

func Run() {
	data, err := os.ReadFile("day07/input.txt")
	if err != nil {
		panic(err)
	}

	input := string(data)

	startPart1 := time.Now()
	answerPart1 := Part1(input)
	endPart1 := time.Now()
	fmt.Printf("Part 1: %v (%d ms)\n", answerPart1, endPart1.Sub(startPart1).Milliseconds())

	startPart2 := time.Now()
	answerPart2, solution := Part2(input, 5, 60)
	endPart2 := time.Now()
	fmt.Printf("Part 2: %v %s (%d ms)\n", answerPart2, solution, endPart2.Sub(startPart2).Milliseconds())
}
