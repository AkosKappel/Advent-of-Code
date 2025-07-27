package day20_test

import (
	"aoc2018/day20"
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

func TestDay20(t *testing.T) {
	t.Run("Part1", func(t *testing.T) {
		cases := []TestCase{
			{
				name:  "Example Input 1",
				input: "^WNE$",
				want:  3,
			},
			{
				name:  "Example Input 2",
				input: "^ENWWW(NEEE|SSE(EE|N))$",
				want:  10,
			},
			{
				name:  "Example Input 3",
				input: "^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$",
				want:  18,
			},
			{
				name:  "Example Input 3",
				input: "^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$",
				want:  23,
			},
			{
				name:  "Example Input 3",
				input: "^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$",
				want:  31,
			},
			{
				name:  "Real Input",
				input: getInput(t, "input.txt"),
				want:  3725,
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				got := day20.Part1(tc.input)
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
				input: "",
				want:  0,
			},
			{
				name:  "Real Input",
				input: getInput(t, "input.txt"),
				want:  0,
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				got := day20.Part2(tc.input)
				if got != tc.want {
					t.Errorf("Part2() = %d; want %d", got, tc.want)
				}
			})
		}
	})
}
