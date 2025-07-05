package day02_test

import (
	"aoc2018/day02"
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

func TestDay02(t *testing.T) {
	t.Run("Part1", func(t *testing.T) {
		cases := []struct {
			name  string
			input string
			want  int
		}{
			{
				name:  "Example Input 1",
				input: getInput(t, "example.txt"),
				want:  12,
			},
			{
				name:  "Real Input",
				input: getInput(t, "input.txt"),
				want:  7904,
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				got := day02.Part1(tc.input)
				if got != tc.want {
					t.Errorf("Part1() = %d; want %d", got, tc.want)
				}
			})
		}
	})

	t.Run("Part2", func(t *testing.T) {
		cases := []struct {
			name  string
			input string
			want  string
		}{
			{
				name:  "Example Input 2",
				input: getInput(t, "example2.txt"),
				want:  "fgij",
			},
			{
				name:  "Real Input",
				input: getInput(t, "input.txt"),
				want:  "wugbihckpoymcpaxefotvdzns",
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				got := day02.Part2(tc.input)
				if got != tc.want {
					t.Errorf("Part2() = %s; want %s", got, tc.want)
				}
			})
		}
	})
}
