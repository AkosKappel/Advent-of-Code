import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

@DisplayName("Day 2")
class Day02Test {
    private val example = readText("day02_example.txt")
    private val input = readText("day02.txt")
    private val day = Day02()

    @Nested
    @DisplayName("Part 1")
    inner class Part1 {
        @Test
        fun `Matches example`() {
            val answer = day.part1(example)
            assertEquals(2, answer)
        }

        @Test
        fun `Matches solution`() {
            val answer = day.part1(input)
            assertEquals(548, answer)
        }
    }

    @Nested
    @DisplayName("Part 2")
    inner class Part2 {
        @Test
        fun `Matches example`() {
            val answer = day.part2(example)
            assertEquals(1, answer)
        }

        @Test
        fun `Matches solution`() {
            val answer = day.part2(input)
            assertEquals(502, answer)
        }
    }
}
