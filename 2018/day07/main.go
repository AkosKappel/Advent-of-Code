package day07

import (
	"fmt"
	"os"
	"sort"
	"strings"
	"time"
)

func parse(s string) (map[rune][]rune, []rune) {
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

	// collect and sort the keys in alphabetical order
	keys := make([]rune, 0, len(nodes))
	for k := range nodes {
		keys = append(keys, k)
	}
	sort.Slice(keys, func(i, j int) bool { return keys[i] < keys[j] })

	return nodes, keys
}

func Part1(input string) string {
	nodes, keys := parse(input)
	solution := make([]rune, 0, len(keys))

	for len(nodes) > 0 {
		// find next node with no dependencies (in sorted order)
		var current rune
		found := false
		for _, k := range keys {
			deps, ok := nodes[k]
			if ok && len(deps) == 0 {
				current = k
				found = true
				break
			}
		}
		if !found {
			panic("could not find node without dependencies")
		}

		// add next step and remove it from the map
		solution = append(solution, current)
		delete(nodes, current)

		// remove current node from dependency lists of remaining nodes
		for k, deps := range nodes {
			newDeps := make([]rune, 0, len(deps))
			for _, dep := range deps {
				if dep != current {
					newDeps = append(newDeps, dep)
				}
			}
			nodes[k] = newDeps
		}
	}

	return string(solution)

}

func Part2(input string) int {
	return 0
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
	answerPart2 := Part2(input)
	endPart2 := time.Now()
	fmt.Printf("Part 2: %v (%d ms)\n", answerPart2, endPart2.Sub(startPart2).Milliseconds())
}
