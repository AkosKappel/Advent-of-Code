class Day16 {

    data class Rule(val name: String, val ranges: List<Pair<Int, Int>>)

    private fun parse(input: String): Triple<List<Rule>, List<Int>, List<List<Int>>> {
        val (rules, myTicket, nearbyTickets) = input.split("\n\n")
        val ruleRegex = Regex("([a-z ]+): (\\d+)-(\\d+) or (\\d+)-(\\d+)")
        val rulesList = rules.lines().map { line ->
            ruleRegex.matchEntire(line)!!.destructured.toList().let { (name, a, b, c, d) ->
                Rule(name, listOf(a.toInt() to b.toInt(), c.toInt() to d.toInt()))
            }
        }
        val myTicketList = myTicket.lines()[1].split(",").map { it.toInt() }
        val nearbyTicketsList = nearbyTickets.lines().drop(1).map { ticket ->
            ticket.split(",").map { it.toInt() }
        }
        return Triple(rulesList, myTicketList, nearbyTicketsList)
    }

    fun part1(input: String): Int = parse(input)
        .let { (rules, _, nearbyTickets) ->
            nearbyTickets
                .flatten()
                .filter { value ->
                    rules.none { rule ->
                        rule.ranges.any { (a, b) -> value in a..b }
                    }
                }.sum()
        }

    fun part2(input: String): Long = parse(input)
        .let { (rules, myTicket, nearbyTickets) ->
            val validTickets = nearbyTickets.filter { ticket ->
                ticket.all { value ->
                    rules.any { rule ->
                        rule.ranges.any { (a, b) -> value in a..b }
                    }
                }
            }
            var possibleRules = myTicket.indices.map { index ->
                rules.filter { rule ->
                    validTickets.all { ticket ->
                        rule.ranges.any { (a, b) -> ticket[index] in a..b }
                    }
                }
            }
            val ruleOrder = mutableMapOf<Int, Rule>()
            while (ruleOrder.size < myTicket.size) {
                val (index, rule) = possibleRules.withIndex()
                    .first { (_, rules) -> rules.size == 1 }
                ruleOrder[index] = rule.first()
                possibleRules = possibleRules.map { rulesList ->
                    rulesList.filter { it != rule.first() }
                }
            }
            ruleOrder
                .filter { (_, rule) -> rule.name.startsWith("departure") }
                .keys
                .map { myTicket[it].toLong() }
                .reduce { a, b -> a * b }
        }
}

fun main() {
    val day = Day16()
    val input = readText("day16.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")

    val startPart2 = System.currentTimeMillis()
    val answerPart2 = day.part2(input)
    val endPart2 = System.currentTimeMillis()
    println("Part 2: $answerPart2 (${endPart2 - startPart2} ms)")
}
