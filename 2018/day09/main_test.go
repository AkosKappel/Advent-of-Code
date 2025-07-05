package day09_test

import (
	"aoc2018/day09"
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

func TestDay09(t *testing.T) {
	t.Run("Part1", func(t *testing.T) {
		cases := []TestCase{
			{
				name:  "Example Input 1",
				input: "9 players; last marble is worth 25 points",
				want:  32,
			},
			{
				name:  "Example Input 2",
				input: "10 players; last marble is worth 1618 points",
				want:  8317,
			},
			{
				name:  "Example Input 3",
				input: "13 players; last marble is worth 7999 points",
				want:  146373,
			},
			{
				name:  "Example Input 4",
				input: "17 players; last marble is worth 1104 points",
				want:  2764,
			},
			{
				name:  "Example Input 5",
				input: "21 players; last marble is worth 6111 points",
				want:  54718,
			},
			{
				name:  "Example Input 6",
				input: "30 players; last marble is worth 5807 points",
				want:  37305,
			},
			{
				name:  "Real Input",
				input: getInput(t, "input.txt"),
				want:  384892,
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				got := day09.Part1(tc.input)
				if got != tc.want {
					t.Errorf("Part1() = %d; want %d", got, tc.want)
				}
			})
		}
	})

	t.Run("Part2", func(t *testing.T) {
		cases := []TestCase{
			{
				name:  "Real Input",
				input: getInput(t, "input.txt"),
				want:  3169872331,
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				got := day09.Part2(tc.input)
				if got != tc.want {
					t.Errorf("Part2() = %d; want %d", got, tc.want)
				}
			})
		}
	})
}
