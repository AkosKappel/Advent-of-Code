class Day05 {

    // Binary Space Partitioning
    private fun bsp(input: String, lower: Char, upper: Char): Int = input
        .replace(lower, '0')
        .replace(upper, '1')
        .toInt(2)

    private fun decodeSeat(seat: String): Int {
        val row = seat.substring(0, 7)
        val col = seat.substring(7)
        return bsp(row, 'F', 'B') * 8 + bsp(col, 'L', 'R')
    }

    fun part1(input: String): Int = input
        .lines()
        .maxOf { decodeSeat(it) }

    fun part2(input: String): Int = input
        .lines()
        .map { decodeSeat(it) }
        .sorted()
        .zipWithNext()
        .first { it.second - it.first == 2 }
        .first + 1
}

fun main() {
    val day = Day05()
    val input = readText("day05.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")

    val startPart2 = System.currentTimeMillis()
    val answerPart2 = day.part2(input)
    val endPart2 = System.currentTimeMillis()
    println("Part 2: $answerPart2 (${endPart2 - startPart2} ms)")
}
