import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

@DisplayName("Day 16")
class Day16Test {
    private val example1 = readText("day16_example1.txt")
    private val example2 = readText("day16_example2.txt")
    private val input = readText("day16.txt")
    private val day = Day16()

    @Nested
    @DisplayName("Part 1")
    inner class Part1 {
        @Test
        fun `Matches example 1`() {
            val answer = day.part1(example1)
            assertEquals(71, answer)
        }

        @Test
        fun `Matches solution`() {
            val answer = day.part1(input)
            assertEquals(27911, answer)
        }
    }

    @Nested
    @DisplayName("Part 2")
    inner class Part2 {
        @Test
        fun `Matches solution`() {
            val answer = day.part2(input)
            assertEquals(737_176_602_479, answer)
        }
    }
}
