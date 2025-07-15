package day16

import (
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

type Sample struct {
	before      [4]int
	instruction [4]int
	after       [4]int
}

type OpFunc func(a, b int, registers [4]int) int

var opcodes = map[string]OpFunc{
	"addr": func(a, b int, registers [4]int) int { return registers[a] + registers[b] },
	"addi": func(a, b int, registers [4]int) int { return registers[a] + b },
	"mulr": func(a, b int, registers [4]int) int { return registers[a] * registers[b] },
	"muli": func(a, b int, registers [4]int) int { return registers[a] * b },
	"banr": func(a, b int, registers [4]int) int { return registers[a] & registers[b] },
	"bani": func(a, b int, registers [4]int) int { return registers[a] & b },
	"borr": func(a, b int, registers [4]int) int { return registers[a] | registers[b] },
	"bori": func(a, b int, registers [4]int) int { return registers[a] | b },
	"setr": func(a, b int, registers [4]int) int { return registers[a] },
	"seti": func(a, b int, registers [4]int) int { return a },
	"gtir": func(a, b int, registers [4]int) int {
		if a > registers[b] {
			return 1
		}
		return 0
	},
	"gtri": func(a, b int, registers [4]int) int {
		if registers[a] > b {
			return 1
		}
		return 0
	},
	"gtrr": func(a, b int, registers [4]int) int {
		if registers[a] > registers[b] {
			return 1
		}
		return 0
	},
	"eqir": func(a, b int, registers [4]int) int {
		if a == registers[b] {
			return 1
		}
		return 0
	},
	"eqri": func(a, b int, registers [4]int) int {
		if registers[a] == b {
			return 1
		}
		return 0
	},
	"eqrr": func(a, b int, registers [4]int) int {
		if registers[a] == registers[b] {
			return 1
		}
		return 0
	},
}

func parseRegisters(line string) [4]int {
	start := strings.Index(line, "[")
	end := strings.Index(line, "]")
	content := line[start+1 : end]

	parts := strings.Split(content, ", ")
	var registers [4]int
	for i, part := range parts {
		registers[i], _ = strconv.Atoi(strings.TrimSpace(part))
	}
	return registers
}

func parseInstruction(line string) [4]int {
	parts := strings.Fields(line)
	var instruction [4]int
	for i, part := range parts {
		instruction[i], _ = strconv.Atoi(part)
	}
	return instruction
}

func parse(s string) []Sample {
	lines := strings.Split(strings.TrimSpace(s), "\n")
	var samples []Sample

	i := 0
	for i < len(lines) {
		line := strings.TrimSpace(lines[i])
		if line == "" {
			i++
			continue
		}

		if strings.HasPrefix(line, "Before:") {
			// Parse a sample
			before := parseRegisters(line)
			i++
			instruction := parseInstruction(strings.TrimSpace(lines[i]))
			i++
			after := parseRegisters(strings.TrimSpace(lines[i]))
			i++

			samples = append(samples, Sample{
				before:      before,
				instruction: instruction,
				after:       after,
			})
		} else {
			// We've reached the test program section, stop parsing samples
			break
		}
	}

	return samples
}

func testOpcode(sample Sample, opFunc OpFunc) bool {
	a := sample.instruction[1]
	b := sample.instruction[2]
	c := sample.instruction[3]

	result := opFunc(a, b, sample.before)

	expected := sample.before
	expected[c] = result

	return expected == sample.after
}

func countMatchingOpcodes(sample Sample) int {
	count := 0
	for _, opFunc := range opcodes {
		if testOpcode(sample, opFunc) {
			count++
		}
	}
	return count
}

func Part1(input string) int {
	samples := parse(input)
	count := 0

	for _, sample := range samples {
		if countMatchingOpcodes(sample) >= 3 {
			count++
		}
	}

	return count
}

func Part2(input string) int {
	return 0
}

func Run() {
	data, err := os.ReadFile("day16/input.txt")
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
