class Day11 {

    private val floor = '.'
    private val empty = 'L'
    private val occupied = '#'

    inner class Grid(val seats: List<List<Char>>) {
        private val rows = seats.size
        private val cols = seats[0].size

        private fun getSeat(row: Int, col: Int): Char = when {
            row < 0 || row >= rows -> floor
            col < 0 || col >= cols -> floor
            else -> seats[row][col]
        }

        private fun getAdjacentSeats(row: Int, col: Int): List<Char> = listOf(
            getSeat(row - 1, col - 1),
            getSeat(row - 1, col),
            getSeat(row - 1, col + 1),
            getSeat(row, col - 1),
            getSeat(row, col + 1),
            getSeat(row + 1, col - 1),
            getSeat(row + 1, col),
            getSeat(row + 1, col + 1),
        )

        private fun getVisibleSeat(row: Int, col: Int, rowDelta: Int, colDelta: Int): Char {
            var r = row + rowDelta
            var c = col + colDelta
            while (r in 0..<rows && c in 0..<cols) {
                val seat = getSeat(r, c)
                if (seat != floor) {
                    return seat
                }
                r += rowDelta
                c += colDelta
            }
            return floor
        }

        private fun getVisibleSeats(row: Int, col: Int): List<Char> = listOf(
            getVisibleSeat(row, col, -1, -1),
            getVisibleSeat(row, col, -1, 0),
            getVisibleSeat(row, col, -1, 1),
            getVisibleSeat(row, col, 0, -1),
            getVisibleSeat(row, col, 0, 1),
            getVisibleSeat(row, col, 1, -1),
            getVisibleSeat(row, col, 1, 0),
            getVisibleSeat(row, col, 1, 1),
        )

        private fun nextAdjacentSeatState(row: Int, col: Int): Char {
            val seat = getSeat(row, col)
            val adjacentSeats = getAdjacentSeats(row, col)
            return when {
                seat == empty && adjacentSeats.none { it == occupied } -> occupied
                seat == occupied && adjacentSeats.count { it == occupied } >= 4 -> empty
                else -> seat
            }
        }

        private fun nextVisibleSeatState(row: Int, col: Int): Char {
            val seat = getSeat(row, col)
            val visibleSeats = getVisibleSeats(row, col)
            return when {
                seat == empty && visibleSeats.none { it == occupied } -> occupied
                seat == occupied && visibleSeats.count { it == occupied } >= 5 -> empty
                else -> seat
            }
        }

        fun nextGrid(adjacent: Boolean): Grid = Grid(
            (0..<rows).map { row ->
                (0..<cols).map { col ->
                    if (adjacent) nextAdjacentSeatState(row, col) else nextVisibleSeatState(row, col)
                }
            }
        )

        fun countOccupiedSeats(): Int = seats.sumOf { row -> row.count { it == occupied } }

        override fun toString(): String = seats
            .joinToString("\n") { row -> row.joinToString("") }
            .plus("\n")

        override fun equals(other: Any?): Boolean = when {
            other !is Grid -> false
            rows != other.rows -> false
            cols != other.cols -> false
            else -> seats == other.seats
        }

        override fun hashCode(): Int = seats.hashCode()
    }

    private fun parse(input: String): List<List<Char>> = input.lines().map { it.toList() }

    fun part1(input: String): Int = generateSequence(Grid(parse(input))) { it.nextGrid(adjacent = true) }
        .zipWithNext()
        .first { (prev, next) -> prev == next }
        .second
        .countOccupiedSeats()

    fun part2(input: String): Int = generateSequence(Grid(parse(input))) { it.nextGrid(adjacent = false) }
        .zipWithNext()
        .first { (prev, next) -> prev == next }
        .second
        .countOccupiedSeats()
}

fun main() {
    val day = Day11()
    val input = readText("day11.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")

    val startPart2 = System.currentTimeMillis()
    val answerPart2 = day.part2(input)
    val endPart2 = System.currentTimeMillis()
    println("Part 2: $answerPart2 (${endPart2 - startPart2} ms)")
}
