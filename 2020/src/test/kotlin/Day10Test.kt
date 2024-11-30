import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

@DisplayName("Day 10")
class Day10Test {
    private val example1 = readText("day10_example1.txt")
    private val example2 = readText("day10_example2.txt")
    private val input = readText("day10.txt")
    private val day = Day10()

    @Nested
    @DisplayName("Part 1")
    inner class Part1 {
        @Test
        fun `Matches example 1`() {
            val answer = day.part1(example1)
            assertEquals(35, answer)
        }

        @Test
        fun `Matches example 2`() {
            val answer = day.part1(example2)
            assertEquals(220, answer)
        }

        @Test
        fun `Matches solution`() {
            val answer = day.part1(input)
            assertEquals(2432, answer)
        }
    }

    @Nested
    @DisplayName("Part 2")
    inner class Part2 {
        @Test
        fun `Matches example 1`() {
            val answer = day.part2(example1)
            assertEquals(8, answer)
        }

        @Test
        fun `Matches example 2`() {
            val answer = day.part2(example2)
            assertEquals(19208, answer)
        }

        @Test
        fun `Matches solution`() {
            val answer = day.part2(input)
            assertEquals(453_551_299_002_368, answer)
        }
    }
}
