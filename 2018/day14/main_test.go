package day14_test

import (
	"aoc2018/day14"
	"testing"
)

func TestDay14(t *testing.T) {
	t.Run("Part1", func(t *testing.T) {
		cases := []struct {
			name  string
			input int
			want  string
		}{
			{
				name:  "Example Input 1",
				input: 9,
				want:  "5158916779",
			},
			{
				name:  "Example Input 2",
				input: 5,
				want:  "0124515891",
			},
			{
				name:  "Example Input 3",
				input: 18,
				want:  "9251071085",
			},
			{
				name:  "Example Input 4",
				input: 2018,
				want:  "5941429882",
			},
			{
				name:  "Real Input",
				input: 704321,
				want:  "1741551073",
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				got := day14.Part1(tc.input)
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
				input: "51589",
				want:  9,
			},
			{
				name:  "Example Input 2",
				input: "01245",
				want:  5,
			},
			{
				name:  "Example Input 3",
				input: "92510",
				want:  18,
			},
			{
				name:  "Example Input 4",
				input: "59414",
				want:  2018,
			},
			{
				name:  "Real Input",
				input: "704321",
				want:  20322683,
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				got := day14.Part2(tc.input)
				if got != tc.want {
					t.Errorf("Part2() = %d; want %d", got, tc.want)
				}
			})
		}
	})
}
