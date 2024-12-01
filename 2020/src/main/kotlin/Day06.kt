class Day06 {

    private fun parse(input: String): List<String> = input
        .split("\n\n")
        .map { it.replace(Regex("\\s+"), " ").trim() }

    fun part1(input: String): Int = parse(input)
        .map { it.replace(" ", "") }
        .sumOf { it.toSet().size }

    fun part2(input: String): Int = parse(input)
        .sumOf { group ->
            group
                .split(" ")
                .map { it.toSet() }
                .reduce { acc, set -> acc.intersect(set) }
                .size
        }
}

fun main() {
    val day = Day06()
    val input = readText("day06.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")

    val startPart2 = System.currentTimeMillis()
    val answerPart2 = day.part2(input)
    val endPart2 = System.currentTimeMillis()
    println("Part 2: $answerPart2 (${endPart2 - startPart2} ms)")
}
