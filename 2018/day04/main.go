package day04

import (
	"fmt"
	"os"
	"regexp"
	"sort"
	"strconv"
	"strings"
	"time"
)

type Record struct {
	Time    time.Time
	Message string
}

type Guard struct {
	Id            int
	MinutesAsleep [60]int // how many times this guard was asleep on each minute [0..59]
	TotalAsleep   int     // total minutes asleep
}

var logPattern = regexp.MustCompile(`\[(\d+)-(\d+)-(\d+) (\d+):(\d+)] (.+)`)

func parse(s string) map[int]*Guard {
	lines := strings.Split(s, "\n")
	sort.Strings(lines) // sort chronologically

	records := make([]Record, 0, len(lines))

	for _, line := range lines {
		if strings.TrimSpace(line) == "" {
			continue
		}

		matches := logPattern.FindStringSubmatch(line)
		if matches == nil {
			panic(fmt.Sprintf("failed to parse line: %s", line))
		}

		year, _ := strconv.Atoi(matches[1])
		month, _ := strconv.Atoi(matches[2])
		day, _ := strconv.Atoi(matches[3])
		hour, _ := strconv.Atoi(matches[4])
		minute, _ := strconv.Atoi(matches[5])
		message := matches[6]

		records = append(records, Record{
			Time:    time.Date(year, time.Month(month), day, hour, minute, 0, 0, time.UTC),
			Message: message,
		})
	}

	return analyze(records)
}

func analyze(records []Record) map[int]*Guard {
	guards := make(map[int]*Guard)

	var currentGuardId, fellAsleepAt int

	for _, rec := range records {
		switch {
		case strings.Contains(rec.Message, "begins shift"):
			fields := strings.Fields(rec.Message)
			id, _ := strconv.Atoi(fields[1][1:]) // strip leading #
			currentGuardId = id
			if _, ok := guards[id]; !ok {
				guards[id] = &Guard{Id: id}
			}

		case strings.Contains(rec.Message, "falls asleep"):
			fellAsleepAt = rec.Time.Minute()

		case strings.Contains(rec.Message, "wakes up"):
			wakeAt := rec.Time.Minute()
			guards[currentGuardId].TotalAsleep += wakeAt - fellAsleepAt
			for m := fellAsleepAt; m < wakeAt; m++ {
				guards[currentGuardId].MinutesAsleep[m]++
			}
		}
	}

	return guards
}

func Part1(input string) int {
	guards := parse(input)

	// Find the guard with the most total asleep
	var sleepiest *Guard
	for _, g := range guards {
		if sleepiest == nil || g.TotalAsleep > sleepiest.TotalAsleep {
			sleepiest = g
		}
	}

	if sleepiest == nil {
		panic("no sleepiest guard")
	}

	// Find the minute this guard was most frequently asleep
	var maxMinute, maxTimesAsleep int
	for minute, timesAsleep := range sleepiest.MinutesAsleep {
		if timesAsleep > maxTimesAsleep {
			maxMinute = minute
			maxTimesAsleep = timesAsleep
		}
	}

	return sleepiest.Id * maxMinute
}

func Part2(input string) int {
	guards := parse(input)

	// Find the guard with the most sleep on a single minute
	var maxTimesAsleep, sleepiestMinute, guardId int
	for id, g := range guards {
		for minute, timesAsleep := range g.MinutesAsleep {
			if timesAsleep > maxTimesAsleep {
				maxTimesAsleep = timesAsleep
				sleepiestMinute = minute
				guardId = id
			}
		}
	}

	return guardId * sleepiestMinute
}

func Run() {
	data, err := os.ReadFile("day04/input.txt")
	if err != nil {
		panic(err)
	}

	input := string(data)

	startPart1 := time.Now()
	answerPart1 := Part1(input)
	endPart1 := time.Now()
	fmt.Printf("Part 1: %v (%d ms)\n", answerPart1, endPart1.Sub(startPart1).Milliseconds())

	startPart2 := time.Now()
	answerPart2 := Part2(input)
	endPart2 := time.Now()
	fmt.Printf("Part 2: %v (%d ms)\n", answerPart2, endPart2.Sub(startPart2).Milliseconds())
}
