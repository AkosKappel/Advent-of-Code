class Day19 {

    private fun parse(input: String): Pair<Map<Int, String>, List<String>> {
        val (rulesPart, messagesPart) = input.split("\r\n\r\n")
        val rules = rulesPart.lines()
            .map { it.split(": ") }
            .associate { it[0].toInt() to it[1] }
        val messages = messagesPart.lines()
        return Pair(rules, messages)
    }

    private fun buildRegex(rules: Map<Int, String>, startRule: Int, startToEnd: Boolean = true): String {
        val rule = rules[startRule]!!
        if (rule.startsWith("\"")) {
            return rule[1].toString()
        }
        val subRules = rule.split(" | ")
        val subRegexes = subRules.map { subRule ->
            subRule.split(" ").joinToString("") { buildRegex(rules, it.toInt(), false) }
        }
        val regex = subRegexes.joinToString("|", "(", ")")
        return if (startToEnd) "^$regex$" else regex
    }

    private val extraRules = mapOf(
        8 to "42 | 42 8",
        11 to "42 31 | 42 11 31",
    )

    private fun match(message: String, rules: Map<Int, String>, startRule: Int, index: Int = 0): List<Int> {
        // past the end of the message, can't match anything else
        if (index >= message.length) {
            return emptyList<Int>()
        }

        // match simple character
        val rule = rules[startRule]!!
        if (rule.startsWith("\"")) {
            // character matches, return next index
            if (message[index] == rule[1]) {
                return listOf(index + 1)
            }
            // character doesn't match
            return emptyList<Int>()
        }

        val matches = mutableListOf<Int>()

        // for each option divided by |
        for (subRule in rule.split(" | ")) {
            // start from the current index
            var subMatches = listOf(index)

            // for any rule in this option
            for (subRuleIndex in subRule.split(" ")) {
                // get all resulting positions after matching this rule
                // from any of the possible starting positions
                val newMatches = mutableListOf<Int>()
                for (subMatch in subMatches) {
                    newMatches.addAll(match(message, rules, subRuleIndex.toInt(), subMatch))
                }
                // keep the new positions and move on to the next rule
                subMatches = newMatches
            }
            // collect all the positions from this option
            matches.addAll(subMatches)
        }

        return matches
    }

    fun part1(input: String): Int {
        val (rules, messages) = parse(input)
        val regex = buildRegex(rules, 0).toRegex()
        val matchingMessages = messages.filter { regex.matches(it) }
        return matchingMessages.size
    }

    fun part2(input: String): Int {
        val (rules, messages) = parse(input)
        val modifiedRules = rules + extraRules
        val matchingMessages = messages.filter { match(it, modifiedRules, 0).contains(it.length) }
        return matchingMessages.size
    }
}

fun main() {
    val day = Day19()
    val input = readText("day19.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")

    val startPart2 = System.currentTimeMillis()
    val answerPart2 = day.part2(input)
    val endPart2 = System.currentTimeMillis()
    println("Part 2: $answerPart2 (${endPart2 - startPart2} ms)")
}
