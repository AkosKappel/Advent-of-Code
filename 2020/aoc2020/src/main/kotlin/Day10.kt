class Day10 {

    private fun parse(input: String): List<Int> = input
        .lines()
        .map { it.toInt() }
        .sorted()
        .toMutableList()
        .apply { add(0, 0) } // add the outlet
        .apply { add(last() + 3) } // add the device

    fun part1(input: String): Int = parse(input)
        .asSequence()
        .windowed(2)
        .map { it[1] - it[0] } // calculate the difference between each pair
        .groupingBy { it } // group by differences
        .eachCount()
        .let { it[1]!! * it[3]!! }

    fun part2(input: String): Long = parse(input)
        .asSequence()
        .windowed(2)
        .map { it[1] - it[0] }
        .joinToString("")
        .split("3")
        .map { it.length }
        .map {
            when (it) {
                1 -> 1
                2 -> 2
                3 -> 4
                4 -> 7
                else -> 1
            }
        }
        .map { it.toLong() }
        .reduce { acc, i -> acc * i }
}

fun main() {
    val day = Day10()
    val input = readText("day10.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")

    val startPart2 = System.currentTimeMillis()
    val answerPart2 = day.part2(input)
    val endPart2 = System.currentTimeMillis()
    println("Part 2: $answerPart2 (${endPart2 - startPart2} ms)")
}
