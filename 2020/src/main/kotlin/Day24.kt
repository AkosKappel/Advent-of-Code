class Day24 {

    enum class Direction {
        E, SE, SW, W, NW, NE
    }

    fun parse(input: String): List<List<Direction>> = input.lines().map { line ->
        val directions = mutableListOf<Direction>()
        var i = 0
        while (i < line.length) {
            val c = line[i]
            val direction = when (c) {
                'e' -> Direction.E
                'w' -> Direction.W
                's' -> when (line[i + 1]) {
                    'e' -> Direction.SE
                    'w' -> Direction.SW
                    else -> throw IllegalArgumentException("Unexpected character ${line[i + 1]}")
                }

                'n' -> when (line[i + 1]) {
                    'e' -> Direction.NE
                    'w' -> Direction.NW
                    else -> throw IllegalArgumentException("Unexpected character ${line[i + 1]}")
                }

                else -> throw IllegalArgumentException("Unexpected character $c")
            }
            directions.add(direction)
            i += direction.name.length
        }
        directions
    }

    private fun findTile(directions: List<Direction>): Pair<Int, Int> {
        var x = 0
        var y = 0
        directions.forEach { direction ->
            when (direction) {
                Direction.E -> x += 2
                Direction.SE -> {
                    x += 1
                    y -= 1
                }

                Direction.SW -> {
                    x -= 1
                    y -= 1
                }

                Direction.W -> x -= 2
                Direction.NW -> {
                    x -= 1
                    y += 1
                }

                Direction.NE -> {
                    x += 1
                    y += 1
                }
            }
        }
        return Pair(x, y)
    }

    private fun neighbors(tile: Pair<Int, Int>): List<Pair<Int, Int>> = listOf(
        Pair(tile.first + 2, tile.second),
        Pair(tile.first + 1, tile.second - 1),
        Pair(tile.first - 1, tile.second - 1),
        Pair(tile.first - 2, tile.second),
        Pair(tile.first - 1, tile.second + 1),
        Pair(tile.first + 1, tile.second + 1),
    )

    fun part1(input: String): Int = parse(input)
        .map { findTile(it) }
        .groupBy { it }.count { it.value.size % 2 == 1 }

    fun part2(input: String): Int = parse(input)
        .map { findTile(it) }
        .groupBy { it }
        .filter { it.value.size % 2 == 1 }
        .map { it.key }
        .toSet()
        .let { blackTiles ->
            (1..100).fold(blackTiles) { tiles, _ ->
                val newTiles = mutableSetOf<Pair<Int, Int>>()
                tiles.forEach { tile ->
                    val blackNeighbors = neighbors(tile).count { it in tiles }
                    if (blackNeighbors == 1 || blackNeighbors == 2) {
                        newTiles.add(tile)
                    }
                    neighbors(tile).filter { it !in tiles }.forEach { neighbor ->
                        val blackNeighborNeighbors = neighbors(neighbor).count { it in tiles }
                        if (blackNeighborNeighbors == 2) {
                            newTiles.add(neighbor)
                        }
                    }
                }
                newTiles
            }
        }.size
}

fun main() {
    val day = Day24()
    val input = readText("day24.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")

    val startPart2 = System.currentTimeMillis()
    val answerPart2 = day.part2(input)
    val endPart2 = System.currentTimeMillis()
    println("Part 2: $answerPart2 (${endPart2 - startPart2} ms)")
}
