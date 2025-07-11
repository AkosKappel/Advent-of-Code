package day07_test

import (
	"aoc2018/day07"
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

func TestDay07(t *testing.T) {
	t.Run("Part1", func(t *testing.T) {
		cases := []struct {
			name  string
			input string
			want  string
		}{
			{
				name:  "Example Input 1",
				input: getInput(t, "example.txt"),
				want:  "CABDFE",
			},
			{
				name:  "Real Input",
				input: getInput(t, "input.txt"),
				want:  "FHMEQGIRSXNWZBCLOTUADJPKVY",
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				got := day07.Part1(tc.input)
				if got != tc.want {
					t.Errorf("Part1() = %s; want %s", got, tc.want)
				}
			})
		}
	})

	t.Run("Part2", func(t *testing.T) {
		cases := []struct {
			name       string
			input      string
			want       int
			numWorkers int
			baseTime   int
		}{
			{
				name:       "Example Input 1",
				input:      getInput(t, "example.txt"),
				want:       15,
				numWorkers: 2,
				baseTime:   0,
			},
			{
				name:       "Real Input",
				input:      getInput(t, "input.txt"),
				want:       917,
				numWorkers: 5,
				baseTime:   60,
			},
		}

		for _, tc := range cases {
			t.Run(tc.name, func(t *testing.T) {
				got, _ := day07.Part2(tc.input, tc.numWorkers, tc.baseTime)
				if got != tc.want {
					t.Errorf("Part2() = %d; want %d", got, tc.want)
				}
			})
		}
	})
}
