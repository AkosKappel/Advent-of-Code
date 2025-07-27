package day24

import (
	"fmt"
	"os"
	"regexp"
	"strconv"
	"strings"
	"time"
)

type Group struct {
	id         int
	army       string
	units      int
	hp         int
	weakTo     map[string]bool
	immuneTo   map[string]bool
	attackType string
	attackDmg  int
	initiative int

	target     *Group
	targetedBy *Group
}

func (g *Group) EffectivePower() int {
	return g.units * g.attackDmg
}

func (g *Group) DamageTo(defender *Group) int {
	if defender.immuneTo[g.attackType] {
		return 0
	}
	damage := g.EffectivePower()
	if defender.weakTo[g.attackType] {
		damage *= 2
	}
	return damage
}

func parse(input string) []*Group {
	var groups []*Group

	section := ""
	idCounter := 1

	// Regular expressions for parsing lines
	reUnitsHP := regexp.MustCompile(`(\d+) units each with (\d+) hit points`)
	reWeakImmune := regexp.MustCompile(`\(([^)]+)\)`)
	reAttack := regexp.MustCompile(`attack that does (\d+) (\w+) damage at initiative (\d+)`)

	lines := strings.Split(strings.TrimSpace(input), "\n")

	for _, line := range lines {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		if strings.HasSuffix(line, ":") {
			section = strings.TrimSuffix(line, ":")
			continue
		}

		unitsHPMatch := reUnitsHP.FindStringSubmatch(line)
		if len(unitsHPMatch) < 3 {
			continue
		}

		units, _ := strconv.Atoi(unitsHPMatch[1])
		hp, _ := strconv.Atoi(unitsHPMatch[2])

		weakTo := make(map[string]bool)
		immuneTo := make(map[string]bool)

		// Extract weaknesses and immunities
		weakImmuneMatch := reWeakImmune.FindStringSubmatch(line)
		if len(weakImmuneMatch) > 1 {
			parts := strings.Split(weakImmuneMatch[1], ";")
			for _, part := range parts {
				part = strings.TrimSpace(part)
				if strings.HasPrefix(part, "weak to ") {
					weaknesses := strings.Split(strings.TrimPrefix(part, "weak to "), ",")
					for _, weakness := range weaknesses {
						weakTo[strings.TrimSpace(weakness)] = true
					}
				} else if strings.HasPrefix(part, "immune to ") {
					immunities := strings.Split(strings.TrimPrefix(part, "immune to "), ",")
					for _, immunity := range immunities {
						immuneTo[strings.TrimSpace(immunity)] = true
					}
				}
			}
		}

		attackMatch := reAttack.FindStringSubmatch(line)
		if len(attackMatch) < 4 {
			continue
		}

		attackDmg, _ := strconv.Atoi(attackMatch[1])
		attackType := attackMatch[2]
		initiative, _ := strconv.Atoi(attackMatch[3])

		groups = append(groups, &Group{
			id:         idCounter,
			army:       section,
			units:      units,
			hp:         hp,
			weakTo:     weakTo,
			immuneTo:   immuneTo,
			attackType: attackType,
			attackDmg:  attackDmg,
			initiative: initiative,
		})
		idCounter++
	}

	return groups
}

func cloneGroups(groups []*Group) []*Group {
	cloned := make([]*Group, len(groups))
	for i, g := range groups {
		weakToCopy := make(map[string]bool)
		for k, v := range g.weakTo {
			weakToCopy[k] = v
		}
		immuneToCopy := make(map[string]bool)
		for k, v := range g.immuneTo {
			immuneToCopy[k] = v
		}
		cloned[i] = &Group{
			id:         g.id,
			army:       g.army,
			units:      g.units,
			hp:         g.hp,
			weakTo:     weakToCopy,
			immuneTo:   immuneToCopy,
			attackType: g.attackType,
			attackDmg:  g.attackDmg,
			initiative: g.initiative,
		}
	}
	return cloned
}

func fight(groups []*Group) (immuneUnits, infectionUnits int, immuneWon bool, stalemate bool) {
	for {
		// Reset targets
		for _, g := range groups {
			g.target = nil
			g.targetedBy = nil
		}

		// Sort groups by effective power, initiative descending
		sortGroups := func(gs []*Group) {
			for i := 0; i < len(gs)-1; i++ {
				for j := 0; j < len(gs)-i-1; j++ {
					a, b := gs[j], gs[j+1]
					if a.EffectivePower() < b.EffectivePower() || (a.EffectivePower() == b.EffectivePower() && a.initiative < b.initiative) {
						gs[j], gs[j+1] = gs[j+1], gs[j]
					}
				}
			}
		}
		sortGroups(groups)

		// Each group chooses target
		for _, attacker := range groups {
			if attacker.units <= 0 {
				continue // Dead groups can't attack
			}
			var target *Group
			maxDamage := 0
			for _, defender := range groups {
				if defender.units <= 0 || defender.army == attacker.army || defender.targetedBy != nil {
					continue // Dead groups can't be targets
				}
				damage := attacker.DamageTo(defender)
				if damage == 0 {
					continue
				}
				if damage > maxDamage ||
					(damage == maxDamage && target != nil && defender.EffectivePower() > target.EffectivePower()) ||
					(damage == maxDamage && target != nil && defender.EffectivePower() == target.EffectivePower() && defender.initiative > target.initiative) {
					maxDamage = damage
					target = defender
				}
			}
			if target != nil {
				attacker.target = target
				target.targetedBy = attacker
			}
		}

		// Attacking phase

		// Sort by initiative descending
		for i := 0; i < len(groups)-1; i++ {
			for j := 0; j < len(groups)-i-1; j++ {
				if groups[j].initiative < groups[j+1].initiative {
					groups[j], groups[j+1] = groups[j+1], groups[j]
				}
			}
		}

		totalUnitsKilled := 0
		for _, attacker := range groups {
			if attacker.units <= 0 || attacker.target == nil {
				continue
			}
			damage := attacker.DamageTo(attacker.target)
			killed := damage / attacker.target.hp
			if killed > attacker.target.units {
				killed = attacker.target.units
			}
			if killed > 0 {
				attacker.target.units -= killed
				totalUnitsKilled += killed
			}
		}

		// Remove dead groups
		var aliveGroups []*Group
		for _, g := range groups {
			if g.units > 0 {
				aliveGroups = append(aliveGroups, g)
			}
		}
		groups = aliveGroups

		// Count remaining units by army
		immuneUnits = 0
		infectionUnits = 0
		for _, g := range groups {
			switch g.army {
			case "Immune System":
				immuneUnits += g.units
			case "Infection":
				infectionUnits += g.units
			}
		}

		if immuneUnits == 0 || infectionUnits == 0 {
			immuneWon = infectionUnits == 0
			stalemate = false
			break
		}

		// If no units killed this round, break to avoid infinite loop
		if totalUnitsKilled == 0 {
			// Stalemate, no units killed this round
			stalemate = true
			immuneWon = false
			break
		}
	}

	return
}

func Part1(input string) int {
	groups := parse(input)
	immuneUnits, infectionUnits, immuneWon, _ := fight(groups)
	if immuneWon {
		return immuneUnits
	}
	return infectionUnits
}

func Part2(input string) int {
	// We'll use binary search over boost amount to find minimal boost for immune system victory

	low := 0
	high := 20000 // arbitrary large upper bound for boost
	var result int

	// Pre-parse without boost to speed cloning later
	originalGroups := parse(input)

	for low <= high {
		mid := (low + high) / 2

		// Clone groups and apply boost
		groups := cloneGroups(originalGroups)
		// Apply boost to immune system attack damage
		for _, g := range groups {
			if g.army == "Immune System" {
				g.attackDmg += mid
			}
		}

		immuneUnits, _, immuneWon, stalemate := fight(groups)

		if immuneWon && !stalemate {
			// immune system wins - try smaller boost
			high = mid - 1
			result = immuneUnits
		} else {
			// infection wins or stalemate - try larger boost
			low = mid + 1
		}
	}

	return result
}

func Run() {
	data, err := os.ReadFile("day24/input.txt")
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
