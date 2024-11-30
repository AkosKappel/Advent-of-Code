class Day25 {

    private val mod = 20201227

    private fun parse(input: String): Pair<Long, Long> = input
        .lines()
        .map { it.toLong() }
        .let { it[0] to it[1] }

    fun part1(input: String): Long = parse(input).let { (card, door) ->
        val subjectNumber = 7L
        var value = 1L
        var loop = 0
        while (value != card) {
            value = (value * subjectNumber) % mod
            loop++
        }
        var encryptionKey = 1L
        repeat(loop) {
            encryptionKey = (encryptionKey * door) % mod
        }
        encryptionKey
    }
}

fun main() {
    val day = Day25()
    val input = readText("day25.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")
}
