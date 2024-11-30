class Day13 {

    private fun parse(input: String): Pair<Int, List<Int?>> = Pair(
        input.lines()[0].toInt(),
        input.lines()[1].split(",").map { it.toIntOrNull() }
    )

    fun part1(input: String): Int = parse(input)
        .let { (timestamp, buses) ->
            buses
                .filterNotNull()
                .map { bus -> Pair(bus, bus - (timestamp % bus)) }
                .minByOrNull { it.second }!!
                .let { it.first * it.second }
        }

    fun part2(input: String): Long {
        val (_, buses) = parse(input)
        val busesWithOffsets = buses
            .mapIndexed { index, bus -> Pair(bus, index) }
            .filter { it.first != null }
            .map { Pair(it.first!!, it.second) }

        var timestamp = 0L
        var step = 1L
        busesWithOffsets.forEach { (bus, offset) ->
            while ((timestamp + offset) % bus != 0L) {
                timestamp += step
            }
            step *= bus
        }
        return timestamp
    }
}

fun main() {
    val day = Day13()
    val input = readText("day13.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")

    val startPart2 = System.currentTimeMillis()
    val answerPart2 = day.part2(input)
    val endPart2 = System.currentTimeMillis()
    println("Part 2: $answerPart2 (${endPart2 - startPart2} ms)")
}
