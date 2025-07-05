package day06_test

import (
	"aoc2018/day06"
	"os"
	"testing"
)

func getInput(t *testing.T, filename string) string {
	data, err := os.ReadFile(filename)
	if err != nil {
		t.Fatalf("Failed to read file %s: %v", filename, err)
	}
	return string(data)
}

func TestDay06(t *testing.T) {
	t.Run("Part1", func(t *testing.T) {
		cases := []struct {
			name  string
			input string
			want  int
		}{
			{
				name:  "Example Input 1",
				input: getInput(t, "example.txt"),
				want:  17,
			},
			{
				name:  "Real Input",
				input: getInput(t, "input.txt"),
				want:  2917,
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				got := day06.Part1(tc.input)
				if got != tc.want {
					t.Errorf("Part1() = %d; want %d", got, tc.want)
				}
			})
		}
	})

	t.Run("Part2", func(t *testing.T) {
		cases := []struct {
			name     string
			input    string
			want     int
			maxTotal int
		}{
			{
				name:     "Example Input 1",
				input:    getInput(t, "example.txt"),
				want:     16,
				maxTotal: 32,
			},
			{
				name:     "Real Input",
				input:    getInput(t, "input.txt"),
				want:     44202,
				maxTotal: 10000,
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				got := day06.Part2(tc.input, tc.maxTotal)
				if got != tc.want {
					t.Errorf("Part2() = %d; want %d", got, tc.want)
				}
			})
		}
	})
}
