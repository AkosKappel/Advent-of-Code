package day08

import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

func parse(s string) []int {
	chunks := strings.Split(s, " ")
	result := make([]int, 0, len(chunks))

	for _, chunk := range chunks {
		n, _ := strconv.Atoi(chunk)
		result = append(result, n)
	}

	return result
}

type Node struct {
	Children []Node
	Metadata []int
}

func buildTree(numbers []int, index int) (Node, int) {
	headers := numbers[index : index+2]
	numChildren := headers[0]
	numMetadata := headers[1]
	index += 2

	children := make([]Node, numChildren)
	for i := 0; i < numChildren; i++ {
		children[i], index = buildTree(numbers, index)
	}

	metadata := numbers[index : index+numMetadata]
	index += numMetadata

	return Node{children, metadata}, index
}

func sumMetadata(node Node) int {
	sum := 0
	for _, metadata := range node.Metadata {
		sum += metadata
	}
	for _, child := range node.Children {
		sum += sumMetadata(child)
	}
	return sum
}

func getValue(node Node) int {
	sum := 0

	if len(node.Children) == 0 {
		for _, metadata := range node.Metadata {
			sum += metadata
		}
	} else {
		for _, metadata := range node.Metadata {
			childIndex := metadata - 1
			if 0 <= childIndex && childIndex < len(node.Children) {
				sum += getValue(node.Children[metadata-1])
			}
		}
	}

	return sum
}

func Part1(input string) int {
	numbers := parse(input)
	tree, _ := buildTree(numbers, 0)
	return sumMetadata(tree)
}

func Part2(input string) int {
	numbers := parse(input)
	tree, _ := buildTree(numbers, 0)
	return getValue(tree)
}

func Run() {
	data, err := os.ReadFile("day08/input.txt")
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
