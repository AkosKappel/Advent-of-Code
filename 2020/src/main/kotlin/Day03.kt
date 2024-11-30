class Day03 {

    private fun checkSlope(input: String, right: Int, down: Int): Int = input
        .lines()
        .filterIndexed { row, _ -> row % down == 0 }
        .mapIndexed { col, line -> line[(col * right) % line.length] }
        .count { it == '#' }

    fun part1(input: String): Int = checkSlope(input, 3, 1)

    fun part2(input: String): Long = listOf(
        Pair(1, 1),
        Pair(3, 1),
        Pair(5, 1),
        Pair(7, 1),
        Pair(1, 2),
    )
        .map { checkSlope(input, it.first, it.second) }
        .map { it.toLong() }
        .reduce(Long::times)
}

fun main() {
    val day = Day03()
    val input = readText("day03.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")

    val startPart2 = System.currentTimeMillis()
    val answerPart2 = day.part2(input)
    val endPart2 = System.currentTimeMillis()
    println("Part 2: $answerPart2 (${endPart2 - startPart2} ms)")
}
