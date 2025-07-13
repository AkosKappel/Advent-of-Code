package day15_test

import (
	"aoc2018/day15"
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

func TestDay15(t *testing.T) {
	t.Run("Part1", func(t *testing.T) {
		cases := []TestCase{
			{
				name:  "Example Input 1",
				input: getInput(t, "example.txt"),
				want:  27730,
			},
			{
				name:  "Example Input 2",
				input: getInput(t, "example2.txt"),
				want:  36334,
			},
			{
				name:  "Example Input 3",
				input: getInput(t, "example3.txt"),
				want:  39514,
			},
			{
				name:  "Example Input 4",
				input: getInput(t, "example4.txt"),
				want:  27755,
			},
			{
				name:  "Example Input 5",
				input: getInput(t, "example5.txt"),
				want:  28944,
			},
			{
				name:  "Example Input 6",
				input: getInput(t, "example6.txt"),
				want:  18740,
			},
			{
				name:  "Real Input",
				input: getInput(t, "input.txt"),
				want:  201123,
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				got := day15.Part1(tc.input)
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
				want:  4988,
			},
			{
				name:  "Example Input 3",
				input: getInput(t, "example3.txt"),
				want:  31284,
			},
			{
				name:  "Example Input 4",
				input: getInput(t, "example4.txt"),
				want:  3478,
			},
			{
				name:  "Example Input 5",
				input: getInput(t, "example5.txt"),
				want:  6474,
			},
			{
				name:  "Example Input 6",
				input: getInput(t, "example6.txt"),
				want:  1140,
			},
			{
				name:  "Real Input",
				input: getInput(t, "input.txt"),
				want:  54188,
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				got := day15.Part2(tc.input)
				if got != tc.want {
					t.Errorf("Part2() = %d; want %d", got, tc.want)
				}
			})
		}
	})
}
