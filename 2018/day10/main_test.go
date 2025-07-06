package day10_test

import (
	"aoc2018/day10"
	"os"
	"strings"
	"testing"
)

func getInput(t *testing.T, filename string) string {
	data, err := os.ReadFile(filename)
	if err != nil {
		t.Fatalf("Failed to read file %s: %v", filename, err)
	}
	return string(data)
}

func TestDay10(t *testing.T) {
	t.Run("Part1", func(t *testing.T) {
		cases := []struct {
			name  string
			input string
			want  string
		}{
			{
				name:  "Example Input 1",
				input: getInput(t, "example.txt"),
				want: strings.TrimSpace(`
#...#..###
#...#...#.
#...#...#.
#####...#.
#...#...#.
#...#...#.
#...#...#.
#...#..###
`),
			},
			{
				name:  "Real Input",
				input: getInput(t, "input.txt"),
				want: strings.TrimSpace(`
.####....####...#.......######..#.......#....#...####...######
#....#..#....#..#............#..#.......#....#..#....#..#.....
#.......#.......#............#..#.......#....#..#.......#.....
#.......#.......#...........#...#.......#....#..#.......#.....
#.......#.......#..........#....#.......######..#.......#####.
#..###..#..###..#.........#.....#.......#....#..#.......#.....
#....#..#....#..#........#......#.......#....#..#.......#.....
#....#..#....#..#.......#.......#.......#....#..#.......#.....
#...##..#...##..#.......#.......#.......#....#..#....#..#.....
.###.#...###.#..######..######..######..#....#...####...######
`),
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				got, _ := day10.Part1(tc.input)
				if got != tc.want {
					t.Errorf("Part1() = %s; want %s", got, tc.want)
				}
			})
		}
	})

	t.Run("Part2", func(t *testing.T) {
		cases := []struct {
			name  string
			input string
			want  int
		}{
			{
				name:  "Example Input 1",
				input: getInput(t, "example.txt"),
				want:  3,
			},
			{
				name:  "Real Input",
				input: getInput(t, "input.txt"),
				want:  10144,
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				got := day10.Part2(tc.input)
				if got != tc.want {
					t.Errorf("Part2() = %d; want %d", got, tc.want)
				}
			})
		}
	})
}
