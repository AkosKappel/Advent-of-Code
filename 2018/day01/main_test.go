package day01_test

import (
	"aoc2018/day01"
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

func TestDay01(t *testing.T) {
	t.Run("Part1", func(t *testing.T) {
		cases := []TestCase{
			{
				name:  "Example Input 1",
				input: "+1, -2, +3, +1",
				want:  3,
			},
			{
				name:  "Example Input 2",
				input: "+1, +1, +1",
				want:  3,
			},
			{
				name:  "Example Input 3",
				input: "+1, +1, -2",
				want:  0,
			},
			{
				name:  "Example Input 4",
				input: "-1, -2, -3",
				want:  -6,
			},
			{
				name:  "Real Input",
				input: getInput(t, "input.txt"),
				want:  490,
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				got := day01.Part1(tc.input)
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
				input: "+1, -2, +3, +1",
				want:  2,
			},
			{
				name:  "Example Input 2",
				input: "+1, -1",
				want:  0,
			},
			{
				name:  "Example Input 3",
				input: "+3, +3, +4, -2, -4",
				want:  10,
			},
			{
				name:  "Example Input 4",
				input: "-6, +3, +8, +5, -6",
				want:  5,
			},
			{
				name:  "Example Input 5",
				input: "+7, +7, -2, -7, -4",
				want:  14,
			},
			{
				name:  "Real Input",
				input: getInput(t, "input.txt"),
				want:  70357,
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				got := day01.Part2(tc.input)
				if got != tc.want {
					t.Errorf("Part2() = %d; want %d", got, tc.want)
				}
			})
		}
	})
}
