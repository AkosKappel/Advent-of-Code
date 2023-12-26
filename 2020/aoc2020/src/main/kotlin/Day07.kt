class Day07 {

    private val myBag = "shiny gold"

    private fun parse(input: String): Map<String, List<Pair<Int, String>>> {
        val rules = mutableMapOf<String, List<Pair<Int, String>>>()
        input.lines().forEach { line ->
            val (bag, contents) = line.split(" bags contain ")
            val contentsList = contents.split(", ").mapNotNull { content ->
                val (count, color) = content.split(" ", limit = 2)
                if (count == "no") {
                    null
                } else {
                    Pair(count.toInt(), color.split(" bag")[0])
                }
            }
            rules[bag] = contentsList
        }
        return rules
    }

    fun part1(input: String): Int = parse(input)
        .let { bagRules ->
            fun canContainMyBag(bag: String): Boolean = bagRules[bag]!!.any { (_, color) ->
                color == myBag || canContainMyBag(color)
            }
            bagRules.keys.count { canContainMyBag(it) }
        }

    fun part2(input: String): Int = parse(input)
        .let { bagRules ->
            fun countInnerBags(bag: String): Int = bagRules[bag]!!.sumOf { (count, color) ->
                count + count * countInnerBags(color)
            }
            countInnerBags(myBag)
        }
}

fun main() {
    val day = Day07()
    val input = readText("day07.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")

    val startPart2 = System.currentTimeMillis()
    val answerPart2 = day.part2(input)
    val endPart2 = System.currentTimeMillis()
    println("Part 2: $answerPart2 (${endPart2 - startPart2} ms)")
}
