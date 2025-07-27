package day19

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
	ipLine := lines[0]
	fmt.Sscanf(ipLine, "#ip %d", &ipBound)

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
		execute(inst.opcode, inst.a, inst.b, inst.c, reg)
		ip = reg[ipBound]
		ip++
	}
	return reg[0]
}

func Part2(input string) int {
	parse(input)

	reg := make([]int, 6)
	reg[0] = 1 // Start with register 0 = 1
	ip := 0

	seen := 0
	var target int

	for ip >= 0 && ip < len(instructions) {
		if ip == 1 { // heuristic: point where the target value is constructed
			// Extracted from your input: after a few iterations, a large number is placed in a register
			target = reg[5] // usually where the main number is stored
			break
		}

		reg[ipBound] = ip
		inst := instructions[ip]
		execute(inst.opcode, inst.a, inst.b, inst.c, reg)
		ip = reg[ipBound]
		ip++
		seen++

		// Fail-safe: don't simulate too long
		if seen > 1000 {
			break
		}
	}

	if target == 0 {
		// Fall back to reading from reg[5] or reg[4]
		target = reg[5]
	}

	return sumOfDivisors(target)
}

func sumOfDivisors(n int) int {
	sum := 0
	for i := 1; i*i <= n; i++ {
		if n%i == 0 {
			sum += i
			if i != n/i {
				sum += n / i
			}
		}
	}
	return sum
}

func Run() {
	data, err := os.ReadFile("day19/input.txt")
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
