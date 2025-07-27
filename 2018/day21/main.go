package day21

import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

type instruction struct {
	opcode  string
	a, b, c int
}

var instructions []instruction
var ipBound int

func parse(s string) {
	lines := strings.Split(strings.TrimSpace(s), "\n")
	_, err := fmt.Sscanf(lines[0], "#ip %d", &ipBound)
	if err != nil {
		panic(err)
	}
	instructions = make([]instruction, 0, len(lines)-1)

	for _, line := range lines[1:] {
		parts := strings.Fields(line)
		a, _ := strconv.Atoi(parts[1])
		b, _ := strconv.Atoi(parts[2])
		c, _ := strconv.Atoi(parts[3])
		instructions = append(instructions, instruction{
			opcode: parts[0], a: a, b: b, c: c,
		})
	}
}

func execute(op string, a, b, c int, r []int) {
	switch op {
	case "addr":
		r[c] = r[a] + r[b]
	case "addi":
		r[c] = r[a] + b
	case "mulr":
		r[c] = r[a] * r[b]
	case "muli":
		r[c] = r[a] * b
	case "banr":
		r[c] = r[a] & r[b]
	case "bani":
		r[c] = r[a] & b
	case "borr":
		r[c] = r[a] | r[b]
	case "bori":
		r[c] = r[a] | b
	case "setr":
		r[c] = r[a]
	case "seti":
		r[c] = a
	case "gtir":
		if a > r[b] {
			r[c] = 1
		} else {
			r[c] = 0
		}
	case "gtri":
		if r[a] > b {
			r[c] = 1
		} else {
			r[c] = 0
		}
	case "gtrr":
		if r[a] > r[b] {
			r[c] = 1
		} else {
			r[c] = 0
		}
	case "eqir":
		if a == r[b] {
			r[c] = 1
		} else {
			r[c] = 0
		}
	case "eqri":
		if r[a] == b {
			r[c] = 1
		} else {
			r[c] = 0
		}
	case "eqrr":
		if r[a] == r[b] {
			r[c] = 1
		} else {
			r[c] = 0
		}
	default:
		panic("Unknown opcode: " + op)
	}
}

func Part1(input string) int {
	parse(input)

	reg := make([]int, 6)
	ip := 0
	for ip >= 0 && ip < len(instructions) {
		reg[ipBound] = ip
		inst := instructions[ip]

		// This is the "halt check" instruction: eqrr A 0 C
		if inst.opcode == "eqrr" && (inst.a == 0 || inst.b == 0) {
			// The program will halt if reg[0] == reg[other]
			other := inst.b
			if inst.a == 0 {
				other = inst.b
			} else {
				other = inst.a
			}
			return reg[other]
		}

		execute(inst.opcode, inst.a, inst.b, inst.c, reg)
		ip = reg[ipBound]
		ip++
	}

	panic("Program never reached halt condition")
}

func Part2(input string) int {
	parse(input)

	reg := make([]int, 6)
	ip := 0
	seen := make(map[int]bool)
	var last int

	for ip >= 0 && ip < len(instructions) {
		reg[ipBound] = ip
		inst := instructions[ip]

		// Detect halt condition comparison
		if inst.opcode == "eqrr" && (inst.a == 0 || inst.b == 0) {
			// Get the value being compared to reg[0]
			var checkVal int
			if inst.a == 0 {
				checkVal = reg[inst.b]
			} else {
				checkVal = reg[inst.a]
			}

			if seen[checkVal] {
				// When value starts repeating, return last unique
				return last
			}

			seen[checkVal] = true
			last = checkVal
		}

		execute(inst.opcode, inst.a, inst.b, inst.c, reg)
		ip = reg[ipBound]
		ip++
	}

	panic("No loop detected; program may halt too early")
}

func Run() {
	data, err := os.ReadFile("day21/input.txt")
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
