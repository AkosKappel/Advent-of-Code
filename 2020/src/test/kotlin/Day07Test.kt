import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

@DisplayName("Day 7")
class Day07Test {
    private val example1 = readText("day07_example1.txt")
    private val example2 = readText("day07_example2.txt")
    private val input = readText("day07.txt")
    private val day = Day07()

    @Nested
    @DisplayName("Part 1")
    inner class Part1 {
        @Test
        fun `Matches example 1`() {
            val answer = day.part1(example1)
            assertEquals(4, answer)
        }

        @Test
        fun `Matches solution`() {
            val answer = day.part1(input)
            assertEquals(252, answer)
        }
    }

    @Nested
    @DisplayName("Part 2")
    inner class Part2 {
        @Test
        fun `Matches example 1`() {
            val answer = day.part2(example1)
            assertEquals(32, answer)
        }

        @Test
        fun `Matches example 2`() {
            val answer = day.part2(example2)
            assertEquals(126, answer)
        }

        @Test
        fun `Matches solution`() {
            val answer = day.part2(input)
            assertEquals(35487, answer)
        }
    }
}
