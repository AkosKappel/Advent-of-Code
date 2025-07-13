package day15

import (
	"fmt"
	"os"
	"sort"
	"strings"
	"time"
)

// Game constants
const (
	Wall   = '#'
	Empty  = '.'
	Goblin = 'G'
	Elf    = 'E'
)

const (
	InitialHP     = 200
	InitialAttack = 3
)

// Point represents a position on the grid
type Point struct {
	row, col int
}

// GetNeighbors returns adjacent positions in reading order (up, left, right, down)
func (p Point) GetNeighbors() []Point {
	return []Point{
		{p.row - 1, p.col}, // up
		{p.row, p.col - 1}, // left
		{p.row, p.col + 1}, // right
		{p.row + 1, p.col}, // down
	}
}

// IsInReadingOrder checks if this point comes before another in reading order
func (p Point) IsInReadingOrder(other Point) bool {
	if p.row != other.row {
		return p.row < other.row
	}
	return p.col < other.col
}

// Unit represents a game character (Goblin or Elf)
type Unit struct {
	position    Point
	hitPoints   int
	attackPower int
	unitType    rune
	isAlive     bool
}

// NewUnit creates a new unit at the specified position
func NewUnit(pos Point, unitType rune) *Unit {
	return &Unit{
		position:    pos,
		hitPoints:   InitialHP,
		attackPower: InitialAttack,
		unitType:    unitType,
		isAlive:     true,
	}
}

// IsEnemy checks if another unit is an enemy
func (u *Unit) IsEnemy(other *Unit) bool {
	return u.unitType != other.unitType
}

// TakeDamage applies damage to the unit
func (u *Unit) TakeDamage(damage int) {
	u.hitPoints -= damage
	if u.hitPoints <= 0 {
		u.isAlive = false
	}
}

// Game represents the battle simulation
type Game struct {
	grid  map[Point]bool // true = wall, false = empty/walkable
	units []*Unit
}

// ParseInput creates a game from the input string
func ParseInput(input string) *Game {
	lines := strings.Split(strings.TrimSpace(input), "\n")

	grid := make(map[Point]bool)
	var units []*Unit

	for rowIndex, line := range lines {
		for colIndex, char := range line {
			position := Point{rowIndex, colIndex}

			switch char {
			case Wall:
				grid[position] = true
			case Empty:
				grid[position] = false
			case Goblin, Elf:
				grid[position] = false
				units = append(units, NewUnit(position, char))
			}
		}
	}

	return &Game{
		grid:  grid,
		units: units,
	}
}

// GetOccupiedPositions returns a map of all positions currently occupied by living units
func (g *Game) GetOccupiedPositions() map[Point]bool {
	occupied := make(map[Point]bool)
	for _, unit := range g.units {
		if unit.isAlive {
			occupied[unit.position] = true
		}
	}
	return occupied
}

// FindEnemies returns all living enemies of the given unit
func (g *Game) FindEnemies(unit *Unit) []*Unit {
	var enemies []*Unit
	for _, other := range g.units {
		if other.isAlive && unit.IsEnemy(other) {
			enemies = append(enemies, other)
		}
	}
	return enemies
}

// GetPositionsInRangeOfEnemies returns all empty positions adjacent to enemies
func (g *Game) GetPositionsInRangeOfEnemies(enemies []*Unit, occupied map[Point]bool) map[Point]bool {
	inRangePositions := make(map[Point]bool)

	for _, enemy := range enemies {
		for _, neighborPos := range enemy.position.GetNeighbors() {
			// Check if position is walkable and not occupied
			if !g.grid[neighborPos] && !occupied[neighborPos] {
				inRangePositions[neighborPos] = true
			}
		}
	}
	return inRangePositions
}

// PathfindingState represents the state during pathfinding
type PathfindingState struct {
	position Point
	distance int
	parent   Point
}

// FindBestMove uses BFS to find the best move towards any target position
func (g *Game) FindBestMove(startPos Point, targetPositions map[Point]bool) Point {
	if len(targetPositions) == 0 {
		return Point{-1, -1} // No targets
	}

	// Initialize BFS
	queue := []PathfindingState{{startPos, 0, Point{-1, -1}}}
	visited := make(map[Point]bool)
	bestPaths := make(map[Point]PathfindingState)
	bestPaths[startPos] = PathfindingState{startPos, 0, Point{-1, -1}}

	occupied := g.GetOccupiedPositions()
	delete(occupied, startPos) // Remove self from occupied positions

	// BFS to find shortest paths
	for len(queue) > 0 {
		current := queue[0]
		queue = queue[1:]

		if visited[current.position] {
			continue
		}
		visited[current.position] = true

		// Explore neighbors
		for _, neighborPos := range current.position.GetNeighbors() {
			// Skip walls and occupied positions
			if g.grid[neighborPos] || occupied[neighborPos] {
				continue
			}

			newDistance := current.distance + 1
			newState := PathfindingState{neighborPos, newDistance, current.position}

			// Update if we found a better path or same distance with better parent
			if existing, exists := bestPaths[neighborPos]; !exists || g.isBetterPath(newState, existing) {
				bestPaths[neighborPos] = newState
				queue = append(queue, newState)
			}
		}
	}

	// Find the closest reachable target
	closestTarget := g.findClosestTarget(targetPositions, bestPaths)
	if closestTarget.row == -1 {
		return Point{-1, -1} // No path found
	}

	// Trace back to find the first step
	return g.traceBackToFirstStep(closestTarget, bestPaths)
}

// isBetterPath determines if a new path is better than an existing one
func (g *Game) isBetterPath(newPath, existingPath PathfindingState) bool {
	if newPath.distance < existingPath.distance {
		return true
	}
	if newPath.distance == existingPath.distance {
		// Same distance, prefer parent in reading order
		return newPath.parent.IsInReadingOrder(existingPath.parent)
	}
	return false
}

// findClosestTarget finds the closest target position in reading order
func (g *Game) findClosestTarget(targets map[Point]bool, paths map[Point]PathfindingState) Point {
	minDistance := int(^uint(0) >> 1) // Max int
	var closestTarget Point
	found := false

	for targetPos := range targets {
		if pathInfo, reachable := paths[targetPos]; reachable {
			if pathInfo.distance < minDistance ||
				(pathInfo.distance == minDistance && (!found || targetPos.IsInReadingOrder(closestTarget))) {
				minDistance = pathInfo.distance
				closestTarget = targetPos
				found = true
			}
		}
	}

	if !found {
		return Point{-1, -1}
	}
	return closestTarget
}

// traceBackToFirstStep traces back from target to find the first step
func (g *Game) traceBackToFirstStep(target Point, paths map[Point]PathfindingState) Point {
	current := target
	for paths[current].distance > 1 {
		current = paths[current].parent
	}
	return current
}

// GetAdjacentEnemies returns all enemies adjacent to the unit
func (g *Game) GetAdjacentEnemies(unit *Unit) []*Unit {
	var adjacentEnemies []*Unit
	enemies := g.FindEnemies(unit)

	for _, enemy := range enemies {
		for _, neighborPos := range unit.position.GetNeighbors() {
			if neighborPos == enemy.position {
				adjacentEnemies = append(adjacentEnemies, enemy)
				break
			}
		}
	}

	return adjacentEnemies
}

// SelectAttackTarget selects the best target to attack (lowest HP, then reading order)
func (g *Game) SelectAttackTarget(adjacentEnemies []*Unit) *Unit {
	if len(adjacentEnemies) == 0 {
		return nil
	}

	// Sort by HP first, then by position in reading order
	sort.Slice(adjacentEnemies, func(i, j int) bool {
		if adjacentEnemies[i].hitPoints != adjacentEnemies[j].hitPoints {
			return adjacentEnemies[i].hitPoints < adjacentEnemies[j].hitPoints
		}
		return adjacentEnemies[i].position.IsInReadingOrder(adjacentEnemies[j].position)
	})

	return adjacentEnemies[0]
}

// ProcessUnitTurn handles a single unit's turn (movement and attack)
func (g *Game) ProcessUnitTurn(unit *Unit) bool {
	enemies := g.FindEnemies(unit)
	if len(enemies) == 0 {
		return true // Combat ends - no more enemies
	}

	// Try to move if not already in range of an enemy
	adjacentEnemies := g.GetAdjacentEnemies(unit)
	if len(adjacentEnemies) == 0 {
		occupied := g.GetOccupiedPositions()
		delete(occupied, unit.position) // Remove self from occupied

		inRangePositions := g.GetPositionsInRangeOfEnemies(enemies, occupied)
		if !inRangePositions[unit.position] {
			nextMove := g.FindBestMove(unit.position, inRangePositions)
			if nextMove.row != -1 {
				unit.position = nextMove
			}
		}

		// Re-check for adjacent enemies after movement
		adjacentEnemies = g.GetAdjacentEnemies(unit)
	}

	// Attack if there are adjacent enemies
	if len(adjacentEnemies) > 0 {
		target := g.SelectAttackTarget(adjacentEnemies)
		if target != nil {
			target.TakeDamage(unit.attackPower)
		}
	}

	return false // Combat continues
}

// SortUnitsByPosition sorts units by their position in reading order
func (g *Game) SortUnitsByPosition() {
	sort.Slice(g.units, func(i, j int) bool {
		return g.units[i].position.IsInReadingOrder(g.units[j].position)
	})
}

// SimulateBattle runs the complete battle simulation
func (g *Game) SimulateBattle() (rounds int, totalHP int) {
	rounds = 0

	for {
		// Process units in reading order
		g.SortUnitsByPosition()

		combatEnded := false
		for _, unit := range g.units {
			if unit.isAlive {
				if g.ProcessUnitTurn(unit) {
					combatEnded = true
					break
				}
			}
		}

		if combatEnded {
			break
		}

		rounds++
	}

	// Calculate total HP of surviving units
	totalHP = 0
	for _, unit := range g.units {
		if unit.isAlive {
			totalHP += unit.hitPoints
		}
	}

	return rounds, totalHP
}

// CountLivingElves returns the number of living elves in the game
func (g *Game) CountLivingElves() int {
	count := 0
	for _, unit := range g.units {
		if unit.isAlive && unit.unitType == Elf {
			count++
		}
	}
	return count
}

// SetElfAttackPower sets the attack power for all elves
func (g *Game) SetElfAttackPower(attackPower int) {
	for _, unit := range g.units {
		if unit.unitType == Elf {
			unit.attackPower = attackPower
		}
	}
}

// SimulateBattleWithElfSurvival runs the battle and returns if all elves survived
func (g *Game) SimulateBattleWithElfSurvival() (rounds int, totalHP int, allElvesSurvived bool) {
	initialElfCount := g.CountLivingElves()
	rounds, totalHP = g.SimulateBattle()
	finalElfCount := g.CountLivingElves()

	return rounds, totalHP, finalElfCount == initialElfCount
}

// testElfAttackPower tests if a given attack power allows all elves to survive
func testElfAttackPower(input string, attackPower int) (bool, int, int) {
	game := ParseInput(input)
	game.SetElfAttackPower(attackPower)

	rounds, totalHP, allElvesSurvived := game.SimulateBattleWithElfSurvival()
	return allElvesSurvived, rounds, totalHP
}

func Part1(input string) int {
	game := ParseInput(input)
	rounds, totalHP := game.SimulateBattle()
	return rounds * totalHP
}

func Part2(input string) int {
	// Binary search for the minimum attack power
	minAttack := InitialAttack + 1 // must be increased by at least 1
	maxAttack := InitialHP         // single attack will kill

	var bestRounds, bestTotalHP int

	for minAttack < maxAttack {
		midAttack := (minAttack + maxAttack) / 2
		survives, rounds, totalHP := testElfAttackPower(input, midAttack)

		if survives {
			// This attack power works, try to find a smaller one
			bestRounds = rounds
			bestTotalHP = totalHP
			maxAttack = midAttack
		} else {
			// This attack power doesn't work, need a higher one
			minAttack = midAttack + 1
		}
	}

	return bestRounds * bestTotalHP
}

func Run() {
	data, err := os.ReadFile("day15/input.txt")
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
