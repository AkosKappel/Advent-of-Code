package day09

import (
	"fmt"
	"time"
)

func parse(s string) (numPlayers int, lastMarble int) {
	_, err := fmt.Sscanf(s, "%d players; last marble is worth %d points", &numPlayers, &lastMarble)
	if err != nil {
		panic(err)
	}

	return numPlayers, lastMarble
}

type Node struct {
	value int
	prev  *Node
	next  *Node
}

type CircularLinkedList struct {
	head *Node
	tail *Node
}

func NewCircularLinkedList(value int) *CircularLinkedList {
	node := &Node{value: value, prev: nil, next: nil}

	list := &CircularLinkedList{}
	list.head = node
	list.tail = node

	node.next = node
	node.prev = node

	return list
}

func (list *CircularLinkedList) Display() {
	if list.head == nil {
		fmt.Println("No Data Present in Linked List.")
	} else {
		start := list.head
		current := start
		for {
			fmt.Printf("%v", current.value)
			current = current.next
			if current == start {
				break
			}
			fmt.Printf(" -> ")
		}
		fmt.Println()
	}
}

func (node *Node) move(offset int) *Node {
	other := node

	if offset > 0 {
		for i := 0; i < offset; i++ {
			other = other.next
		}
		return other
	}

	if offset < 0 {
		for i := 0; i < -offset; i++ {
			other = other.prev
		}
		return other
	}

	return other
}

func (node *Node) Insert(value int) *Node {
	temp := node
	newNode := &Node{value: value, prev: temp, next: temp.next}
	temp.next.prev = newNode
	temp.next = newNode
	return newNode
}

func (node *Node) Remove() *Node {
	temp := node
	temp.prev.next = temp.next
	temp.next.prev = temp.prev
	return temp
}

func Part1(input string) int {
	numPlayers, lastMarble := parse(input)

	score := make([]int, numPlayers)
	list := NewCircularLinkedList(0)

	current := list.head
	for marble := 1; marble <= lastMarble; marble++ {
		player := marble % numPlayers
		if marble%23 == 0 {
			other := current.move(-7)
			score[player] += marble + other.value
			current = other.move(1)
			other.Remove()
		} else {
			current = current.move(1).Insert(marble)
		}
	}

	highScore := 0
	for _, value := range score {
		if value > highScore {
			highScore = value
		}
	}

	//list.Display()
	return highScore
}

func Part2(input string) int {
	return 0
}

func Run() {
	//data, err := os.ReadFile("day09/input.txt")
	//if err != nil {
	//	panic(err)
	//}
	//
	//input := string(data)
	input := "9 players; last marble is worth 25 points"

	startPart1 := time.Now()
	answerPart1 := Part1(input)
	endPart1 := time.Now()
	fmt.Printf("Part 1: %v (%d ms)\n", answerPart1, endPart1.Sub(startPart1).Milliseconds())

	startPart2 := time.Now()
	answerPart2 := Part2(input)
	endPart2 := time.Now()
	fmt.Printf("Part 2: %v (%d ms)\n", answerPart2, endPart2.Sub(startPart2).Milliseconds())
}
