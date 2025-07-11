package day08_test

import (
	"aoc2018/day08"
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

func TestDay08(t *testing.T) {
	t.Run("Part1", func(t *testing.T) {
		cases := []TestCase{
			{
				name:  "Example Input 1",
				input: "2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2",
				want:  138,
			},
			{
				name:  "Real Input",
				input: getInput(t, "input.txt"),
				want:  46781,
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				got := day08.Part1(tc.input)
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
				input: "2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2",
				want:  66,
			},
			{
				name:  "Real Input",
				input: getInput(t, "input.txt"),
				want:  21405,
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				got := day08.Part2(tc.input)
				if got != tc.want {
					t.Errorf("Part2() = %d; want %d", got, tc.want)
				}
			})
		}
	})
}
