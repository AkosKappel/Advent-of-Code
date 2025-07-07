package day13_test

import (
	"aoc2018/day13"
	"os"
	"testing"
)

type TestCase struct {
	name  string
	input string
	want  string
}

func getInput(t *testing.T, filename string) string {
	data, err := os.ReadFile(filename)
	if err != nil {
		t.Fatalf("Failed to read file %s: %v", filename, err)
	}
	return string(data)
}

func TestDay13(t *testing.T) {
	t.Run("Part1", func(t *testing.T) {
		cases := []TestCase{
			{
				name:  "Example Input 1",
				input: "",
				want:  "7,3",
			},
			{
				name:  "Real Input",
				input: getInput(t, "input.txt"),
				want:  "109,23",
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				got := day13.Part1(tc.input)
				if got != tc.want {
					t.Errorf("Part1() = %d; want %d", got, tc.want)
				}
			})
		}
	})

	t.Run("Part2", func(t *testing.T) {
		cases := []TestCase{
			{
				name:  "Example Input 2",
				input: getInput(t, "example2.txt"),
				want:  "6,4",
			},
			{
				name:  "Real Input",
				input: getInput(t, "input.txt"),
				want:  "137,101",
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				got := day13.Part2(tc.input)
				if got != tc.want {
					t.Errorf("Part2() = %d; want %d", got, tc.want)
				}
			})
		}
	})
}
