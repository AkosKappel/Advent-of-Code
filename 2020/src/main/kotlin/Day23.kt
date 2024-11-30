class Day23 {

    private fun parse(input: String, numCards: Int = input.length): List<Int> =
        input.map { it.toString().toInt() } + (input.length + 1..numCards).toList()

    private fun play(cups: List<Int>, moves: Int): IntArray {
        val max = cups.maxOrNull()!!
        val min = cups.minOrNull()!!
        val next = IntArray(cups.size + 1) { it + 1 }
        cups.forEachIndexed { index, cup ->
            next[cup] = cups[(index + 1) % cups.size]
        }
        var current = cups.first().toInt()
        repeat(moves) {
            val a = next[current]
            val b = next[a]
            val c = next[b]
            next[current] = next[c]
            var destination = current - 1
            while (destination == a || destination == b || destination == c || destination < min) {
                if (destination < min) destination = max else destination--
            }
            next[c] = next[destination]
            next[destination] = a
            current = next[current]
        }
        return next
    }

    fun part1(input: String, moves: Int): Long = parse(input).let { cups ->
        val next = play(cups, moves)
        var cup = next[1]
        var answer = 0L
        while (cup != 1) {
            answer = answer * 10 + cup
            cup = next[cup]
        }
        answer
    }

    fun part2(input: String, moves: Int): Long = parse(input, 1_000_000).let { cups ->
        val next = play(cups, moves)
        val a = next[1]
        val b = next[a]
        a.toLong() * b.toLong()
    }
}

fun main() {
    val day = Day23()
    val input = readText("day23.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input, 100)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")

    val startPart2 = System.currentTimeMillis()
    val answerPart2 = day.part2(input, 10_000_000)
    val endPart2 = System.currentTimeMillis()
    println("Part 2: $answerPart2 (${endPart2 - startPart2} ms)")
}
