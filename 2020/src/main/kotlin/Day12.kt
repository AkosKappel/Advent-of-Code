import kotlin.math.abs
import kotlin.math.cos
import kotlin.math.roundToInt
import kotlin.math.sin

class Day12 {

    enum class Direction {
        NORTH, EAST, SOUTH, WEST
    }

    class Waypoint(var x: Int, var y: Int) {
        fun execute(instruction: String) {
            val action = instruction[0]
            val value = instruction.substring(1).toInt()
            when (action) {
                'N' -> y += value
                'S' -> y -= value
                'E' -> x += value
                'W' -> x -= value
                'L' -> rotate(value)
                'R' -> rotate(-value)
                'F' -> throw IllegalStateException("Waypoint cannot execute F")
            }
        }

        private fun rotate(degrees: Int) {
            val radians = Math.toRadians(degrees.toDouble())
            val newX = x * cos(radians) - y * sin(radians)
            val newY = x * sin(radians) + y * cos(radians)
            x = newX.roundToInt()
            y = newY.roundToInt()
        }

        override fun toString(): String = "Waypoint(x=$x, y=$y)"
    }

    class Ship(
        private var x: Int,
        private var y: Int,
        private var direction: Direction,
        private val waypoint: Waypoint? = null
    ) {
        fun execute(instruction: String) {
            val action = instruction[0]
            val value = instruction.substring(1).toInt()

            if (waypoint != null) {
                if (action == 'F') {
                    x += waypoint.x * value
                    y += waypoint.y * value
                    return
                }
                waypoint.execute(instruction)
                return
            }

            when (action) {
                'N' -> y += value
                'S' -> y -= value
                'E' -> x += value
                'W' -> x -= value
                'L' -> direction = turn(-value)
                'R' -> direction = turn(value)
                'F' -> when (direction) {
                    Direction.NORTH -> y += value
                    Direction.SOUTH -> y -= value
                    Direction.EAST -> x += value
                    Direction.WEST -> x -= value
                }
            }
        }

        fun manhattanDistance(): Int = abs(x) + abs(y)

        private fun turn(degrees: Int): Direction {
            val directions = Direction.entries.toTypedArray()
            val current = directions.indexOf(direction)
            val next = ((current + (degrees / 90)) + directions.size) % directions.size
            return directions[next]
        }

        override fun toString(): String = "Ship(x=$x, y=$y, direction=$direction, waypoint=$waypoint)"
    }

    fun part1(input: String): Int = input
        .lines()
        .fold(Ship(0, 0, Direction.EAST)) { ship, instruction ->
            ship.execute(instruction)
            ship
        }
        .manhattanDistance()

    fun part2(input: String): Int = input
        .lines()
        .fold(Ship(0, 0, Direction.EAST, Waypoint(10, 1))) { ship, instruction ->
            ship.execute(instruction)
            ship
        }
        .manhattanDistance()
}

fun main() {
    val day = Day12()
    val input = readText("day12.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")

    val startPart2 = System.currentTimeMillis()
    val answerPart2 = day.part2(input)
    val endPart2 = System.currentTimeMillis()
    println("Part 2: $answerPart2 (${endPart2 - startPart2} ms)")
}
