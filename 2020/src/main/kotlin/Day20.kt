class Day20 {

    enum class Direction {
        TOP, BOTTOM, LEFT, RIGHT
    }

    class Tile(val id: Long, val data: List<List<Char>>) {
        private val top: List<Char> by lazy { data.first() }
        private val bottom: List<Char> by lazy { data.last() }
        private val left: List<Char> by lazy { data.map { it.first() } }
        private val right: List<Char> by lazy { data.map { it.last() } }
        private val sides: List<List<Char>> by lazy { listOf(top, bottom, left, right) }

        private fun rotate90(): Tile {
            val newData = mutableListOf<MutableList<Char>>()
            for (i in data.indices) {
                val newRow = mutableListOf<Char>()
                for (j in data.indices) {
                    newRow.add(data[data.size - j - 1][i])
                }
                newData.add(newRow)
            }
            return Tile(id, newData)
        }

        private fun flip(): Tile {
            val newData = mutableListOf<MutableList<Char>>()
            for (i in data.indices) {
                val newRow = mutableListOf<Char>()
                for (j in data.indices) {
                    newRow.add(data[i][data.size - j - 1])
                }
                newData.add(newRow)
            }
            return Tile(id, newData)
        }

        fun allOrientations(): Sequence<Tile> = sequence {
            var current = this@Tile
            for (i in 0..3) {
                yield(current)
                yield(current.flip())
                current = current.rotate90()
            }
        }

        fun matchesAnySide(other: Tile): Boolean =
            sides.any { side ->
                other.sides.any { otherSide ->
                    side == otherSide || side.reversed() == otherSide
                }
            }

        private fun matchesTop(other: Tile): Boolean = top == other.bottom

        private fun matchesBottom(other: Tile): Boolean = bottom == other.top

        private fun matchesLeft(other: Tile): Boolean = left == other.right

        private fun matchesRight(other: Tile): Boolean = right == other.left

        fun matches(other: Tile, direction: Direction): Boolean = when (direction) {
            Direction.TOP -> matchesTop(other)
            Direction.BOTTOM -> matchesBottom(other)
            Direction.LEFT -> matchesLeft(other)
            Direction.RIGHT -> matchesRight(other)
        }

        fun removeBorder(): Tile {
            val newData = data.drop(1).dropLast(1).map { it.drop(1).dropLast(1) }
            return Tile(id, newData)
        }

        override fun toString(): String {
            val builder = StringBuilder()
            builder.append("Tile $id:\n")
            data.forEach { row ->
                row.forEach { builder.append(it) }
                builder.append("\n")
            }
            return builder.toString()
        }
    }

    private fun parse(input: String): Map<Long, Tile> = input
        .trim()
        .split("\n\n")
        .filter { it.isNotBlank() }
        .associate { tile ->
            val lines = tile.lines()
            val id = lines.first().substring(5, 9).toLong()
            val data = lines.drop(1).map { it.toList() }
            id to Tile(id, data)
        }

    private fun findMatches(tiles: Map<Long, Tile>): Map<Long, List<Long>> {
        val matches = mutableMapOf<Long, List<Long>>()
        tiles.forEach { (id1, tile1) ->
            val otherTiles = tiles.filter { (id2, _) -> id1 != id2 }
            val matchesForTile = otherTiles.filter { (_, tile2) -> tile1.matchesAnySide(tile2) }
                .map { (id2, _) -> id2 }
            matches[id1] = matchesForTile
        }
        return matches
    }

    private fun findNext(
        tile: Tile,
        direction: Direction,
        tiles: Map<Long, Tile>,
        matches: Map<Long, List<Long>>,
    ): Tile? =
        matches[tile.id]?.asSequence()?.mapNotNull { id ->
            tiles[id]?.allOrientations()?.firstOrNull { orientedTile ->
                tile.matches(orientedTile, direction)
            }
        }?.firstOrNull()

    private fun buildRow(startTile: Tile, tiles: Map<Long, Tile>, matches: Map<Long, List<Long>>): List<Tile> {
        val row = mutableListOf<Tile>()
        var current = startTile
        row.add(current)
        while (true) {
            val nextTile = findNext(current, Direction.RIGHT, tiles, matches)
            if (nextTile != null) {
                row.add(nextTile)
                current = nextTile
            } else {
                return row
            }
        }
    }

    private fun buildImage(tiles: Map<Long, Tile>): List<List<Char>> {
        val matches = findMatches(tiles)
        val corners = matches.filter { it.value.size == 2 }.map { tiles[it.key]!! }
        val image = mutableListOf<List<Tile>>()

        val firstCorner = corners.first()
        val firstCornerMatches = matches[firstCorner.id]!!

        // Orient the first corner so that it matches the tiles to the right and bottom
        val topLeft = firstCorner.allOrientations().first { tile ->
            val rightTile = tiles[firstCornerMatches.first()]!!
            val bottomTile = tiles[firstCornerMatches.last()]!!
            val rightMatched = rightTile.allOrientations().any { tile.matches(it, Direction.RIGHT) }
            val bottomMatched = bottomTile.allOrientations().any { tile.matches(it, Direction.BOTTOM) }
            rightMatched && bottomMatched
        }

        // Build image row by row starting from the top left corner
        var current = topLeft
        while (true) {
            val nextRow = buildRow(current, tiles, matches)
            image.add(nextRow)
            val nextTile = findNext(current, Direction.BOTTOM, tiles, matches)
            if (nextTile != null) {
                current = nextTile
            } else {
                return image.map { row ->
                    row.map { tile -> tile.removeBorder() }
                        .map { tile -> tile.data }
                        .reduce { acc, list -> acc.zip(list) { a, b -> a + b } }
                }.reduce { acc, list -> acc + list }
            }
        }
    }

    private val monster = listOf(
        "                  # ",
        "#    ##    ##    ###",
        " #  #  #  #  #  #   ",
    ).map { it.toList() }

    private fun countPatterns(image: List<List<Char>>, pattern: List<List<Char>>): Int {
        var count = 0
        for (i in 0..(image.size - pattern.size)) {
            for (j in 0..(image.size - pattern.first().size)) {
                var found = true
                patternLoop@ for (k in pattern.indices) {
                    for (l in pattern.first().indices) {
                        if (pattern[k][l] == '#' && image[i + k][j + l] != '#') {
                            found = false
                            break@patternLoop
                        }
                    }
                }
                if (found) {
                    count++
                }
            }
        }
        return count
    }

    fun part1(input: String): Long = parse(input)
        .let { findMatches(it) }
        .filter { it.value.size == 2 }
        .map { it.key }
        .reduce { acc, id -> acc * id }

    fun part2(input: String): Int = parse(input)
        .let { tiles ->
            val image = Tile(0, buildImage(tiles))
            val monsterCount = image.allOrientations().sumOf { countPatterns(it.data, monster) }
            val monsterSize = monster.sumOf { it.count { c -> c == '#' } }
            val imageSize = image.data.sumOf { it.count { c -> c == '#' } }
            imageSize - monsterCount * monsterSize
        }
}

fun main() {
    val day = Day20()
    val input = readText("day20.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")

    val startPart2 = System.currentTimeMillis()
    val answerPart2 = day.part2(input)
    val endPart2 = System.currentTimeMillis()
    println("Part 2: $answerPart2 (${endPart2 - startPart2} ms)")
}
