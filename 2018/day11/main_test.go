package day11_test

import (
	"aoc2018/day11"
	"testing"
)

type TestCase struct {
	name  string
	input int
	wantX int
	wantY int
	want  int
}

func TestDay11(t *testing.T) {
	t.Run("Part1", func(t *testing.T) {
		cases := []TestCase{
			{
				name:  "Example Input 1",
				input: 18,
				wantX: 33,
				wantY: 45,
				want:  29,
			},
			{
				name:  "Example Input 2",
				input: 42,
				wantX: 21,
				wantY: 61,
				want:  30,
			},
			{
				name:  "Real Input",
				input: 7165,
				wantX: 235,
				wantY: 20,
				want:  31,
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				gotX, gotY, gotPower := day11.Part1(tc.input)
				if gotX != tc.wantX || gotY != tc.wantY || gotPower != tc.want {
					t.Errorf("Part1() = (%d, %d, %d); want (%d, %d, %d)", gotX, gotY, gotPower, tc.wantX, tc.wantY, tc.want)
				}
			})
		}
	})

	t.Run("Part2", func(t *testing.T) {
		cases := []TestCase{
			{
				name:  "Example Input 1",
				input: 18,
				wantX: 90,
				wantY: 269,
				want:  16,
			},
			{
				name:  "Example Input 2",
				input: 42,
				wantX: 232,
				wantY: 251,
				want:  12,
			},
			{
				name:  "Real Input",
				input: 7165,
				wantX: 237,
				wantY: 223,
				want:  14,
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				gotX, gotY, gotSize := day11.Part2(tc.input)
				if gotX != tc.wantX || gotY != tc.wantY || gotSize != tc.want {
					t.Errorf("Part2() = (%d, %d, %d); want (%d, %d, %d)", gotX, gotY, gotSize, tc.wantX, tc.wantY, tc.want)
				}
			})
		}
	})
}
