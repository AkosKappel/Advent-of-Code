package main

import (
	"aoc2018/day01"
	"aoc2018/day02"
	"aoc2018/day03"
	"aoc2018/day04"
	"aoc2018/day05"
	"aoc2018/day06"
	"aoc2018/day07"
	"aoc2018/day08"
	"aoc2018/day09"
	"aoc2018/day10"
	"aoc2018/day11"
	"aoc2018/day12"
	"aoc2018/day13"
	"aoc2018/day14"
	"aoc2018/day15"
	"aoc2018/day16"
	"aoc2018/day17"
	"aoc2018/day18"
	"aoc2018/day19"
	"aoc2018/day20"
	"aoc2018/day21"
	"aoc2018/day22"
	"aoc2018/day23"
	"aoc2018/day24"
	"aoc2018/day25"
)

func main() {
	daysToRun := []int{11}

	for _, day := range daysToRun {
		switch day {
		case 1:
			day01.Run()
		case 2:
			day02.Run()
		case 3:
			day03.Run()
		case 4:
			day04.Run()
		case 5:
			day05.Run()
		case 6:
			day06.Run()
		case 7:
			day07.Run()
		case 8:
			day08.Run()
		case 9:
			day09.Run()
		case 10:
			day10.Run()
		case 11:
			day11.Run()
		case 12:
			day12.Run()
		case 13:
			day13.Run()
		case 14:
			day14.Run()
		case 15:
			day15.Run()
		case 16:
			day16.Run()
		case 17:
			day17.Run()
		case 18:
			day18.Run()
		case 19:
			day19.Run()
		case 20:
			day20.Run()
		case 21:
			day21.Run()
		case 22:
			day22.Run()
		case 23:
			day23.Run()
		case 24:
			day24.Run()
		case 25:
			day25.Run()
		default:
			panic("Unknown AoC day")
		}
	}
}
