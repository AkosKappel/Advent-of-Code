class Day15 {

    private fun parse(input: String): List<Int> = input
        .split(",")
        .map { it.toInt() }

    private fun solve(input: String, nth: Int): Int = parse(input)
        .let { numbers ->
            val lastSpoken = mutableMapOf<Int, Int>()
            numbers.dropLast(1).forEachIndexed { index, number ->
                lastSpoken[number] = index + 1
            }
            var lastNumber = numbers.last()
            for (i in numbers.size..<nth) {
                val nextNumber = if (lastSpoken.containsKey(lastNumber)) {
                    i - lastSpoken[lastNumber]!!
                } else {
                    0
                }
                lastSpoken[lastNumber] = i
                lastNumber = nextNumber
            }
            lastNumber
        }

    private fun solveFast(input: String, nth: Int): Int = parse(input)
        .let { numbers ->
            val lastSpoken = IntArray(nth) { -1 }
            numbers.dropLast(1).forEachIndexed { index, number ->
                lastSpoken[number] = index + 1
            }
            var lastNumber = numbers.last()
            for (i in numbers.size..<nth) {
                val nextNumber = if (lastSpoken[lastNumber] != -1) {
                    i - lastSpoken[lastNumber]
                } else {
                    0
                }
                lastSpoken[lastNumber] = i
                lastNumber = nextNumber
            }
            lastNumber
        }

    fun part1(input: String): Int = solve(input, 2020)

    fun part2(input: String): Int = solveFast(input, 30_000_000)
}

fun main() {
    val day = Day15()
    val input = readText("day15.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")

    val startPart2 = System.currentTimeMillis()
    val answerPart2 = day.part2(input)
    val endPart2 = System.currentTimeMillis()
    println("Part 2: $answerPart2 (${endPart2 - startPart2} ms)")
}
