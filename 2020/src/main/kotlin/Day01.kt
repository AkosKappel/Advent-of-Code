class Day01 {

    private val target = 2020

    fun part1(input: String): Int = input
        .lines()
        .map { it.toInt() }
        .let { numbers ->
            numbers
                .flatMap { a -> numbers.map { b -> Pair(a, b) } }
                .find { (a, b) -> a + b == target }
                ?.let { (a, b) -> a * b }
        } ?: 0

    fun part2(input: String): Int {
        val numbers = input.lines().map { it.toInt() }
        val sortedNumbers = numbers.sorted()

        for (i in 0..<sortedNumbers.size - 2) {
            var left = i + 1
            var right = sortedNumbers.size - 1

            while (left < right) {
                val sum = sortedNumbers[i] + sortedNumbers[left] + sortedNumbers[right]

                when {
                    sum < target -> left++
                    sum > target -> right--
                    else -> return sortedNumbers[i] * sortedNumbers[left] * sortedNumbers[right]
                }
            }
        }

        return 0
    }
}

fun main() {
    val day = Day01()
    val input = readText("day01.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")

    val startPart2 = System.currentTimeMillis()
    val answerPart2 = day.part2(input)
    val endPart2 = System.currentTimeMillis()
    println("Part 2: $answerPart2 (${endPart2 - startPart2} ms)")
}
