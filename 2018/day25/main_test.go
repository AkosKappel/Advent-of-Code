package day25_test

import (
	"aoc2018/day25"
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

func TestDay25(t *testing.T) {
	t.Run("Part1", func(t *testing.T) {
		cases := []TestCase{
			{
				name:  "Example Input 1",
				input: getInput(t, "example.txt"),
				want:  2,
			},
			{
				name:  "Example Input 2",
				input: getInput(t, "example2.txt"),
				want:  4,
			},
			{
				name:  "Example Input 3",
				input: getInput(t, "example3.txt"),
				want:  3,
			},
			{
				name:  "Example Input 4",
				input: getInput(t, "example4.txt"),
				want:  8,
			},
			{
				name:  "Real Input",
				input: getInput(t, "input.txt"),
				want:  420,
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				got := day25.Part1(tc.input)
				if got != tc.want {
					t.Errorf("Part1() = %d; want %d", got, tc.want)
				}
			})
		}
	})
}
