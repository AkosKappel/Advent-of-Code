class Day09 {

    private fun parse(input: String): List<Long> = input
        .lines()
        .map { it.toLong() }

    fun part1(input: String, preambleLength: Int = 25): Long = parse(input)
        .windowed(preambleLength + 1)
        .first { window ->
            val preamble = window.dropLast(1)
            val target = window.last()
            !preamble.any { a ->
                preamble.any { b ->
                    a != b && a + b == target
                }
            }
        }
        .last()

    fun part2(input: String, preambleLength: Int = 25): Long {
        val target = part1(input, preambleLength)
        val numbers = parse(input)
        val range = numbers.indices
            .map { start ->
                numbers.indices
                    .drop(start)
                    .map { end ->
                        numbers.subList(start, end)
                    }
            }
            .flatten()
            .first { it.sum() == target }
        range.println()
        return range.min() + range.max()
    }
}

fun main() {
    val day = Day09()
    val input = readText("day09.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")

    val startPart2 = System.currentTimeMillis()
    val answerPart2 = day.part2(input)
    val endPart2 = System.currentTimeMillis()
    println("Part 2: $answerPart2 (${endPart2 - startPart2} ms)")
}
