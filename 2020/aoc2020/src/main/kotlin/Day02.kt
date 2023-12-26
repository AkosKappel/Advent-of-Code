class Day02 {

    data class Row(val min: Int, val max: Int, val char: Char, val password: String) {
        fun hasValidCount(): Boolean = password.count { it == char } in min..max
        fun isValid(): Boolean = (password[min - 1] == char) xor (password[max - 1] == char)
    }

    private fun parse(input: String): List<Row> = input
        .lines()
        .map { """(\d+)-(\d+) (\w): (\w+)""".toRegex().find(it)!!.groupValues }
        .map { Row(it[1].toInt(), it[2].toInt(), it[3][0], it[4]) }

    fun part1(input: String): Int = parse(input).count { it.hasValidCount() }

    fun part2(input: String): Int = parse(input).count { it.isValid() }

}

fun main() {
    val day = Day02()
    val input = readText("day02.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")

    val startPart2 = System.currentTimeMillis()
    val answerPart2 = day.part2(input)
    val endPart2 = System.currentTimeMillis()
    println("Part 2: $answerPart2 (${endPart2 - startPart2} ms)")
}
