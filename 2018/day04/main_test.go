package day04_test

import (
	"aoc2018/day04"
	"os"
	"testing"
)

type TestCase struct {
	name  string
	input string
	want  int
}

func getInput(t *testing.T, filename string) string {
	data, err := os.ReadFile(filename)
	if err != nil {
		t.Fatalf("Failed to read file %s: %v", filename, err)
	}
	return string(data)
}

func TestDay04(t *testing.T) {
	t.Run("Part1", func(t *testing.T) {
		cases := []TestCase{
			{
				name:  "Example Input 1",
				input: getInput(t, "example.txt"),
				want:  240,
			},
			{
				name:  "Real Input",
				input: getInput(t, "input.txt"),
				want:  8421,
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				got := day04.Part1(tc.input)
				if got != tc.want {
					t.Errorf("Part1() = %d; want %d", got, tc.want)
				}
			})
		}
	})

	t.Run("Part2", func(t *testing.T) {
		cases := []TestCase{
			{
				name:  "Example Input 1",
				input: getInput(t, "example.txt"),
				want:  4455,
			},
			{
				name:  "Real Input",
				input: getInput(t, "input.txt"),
				want:  83359,
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				got := day04.Part2(tc.input)
				if got != tc.want {
					t.Errorf("Part2() = %d; want %d", got, tc.want)
				}
			})
		}
	})
}
