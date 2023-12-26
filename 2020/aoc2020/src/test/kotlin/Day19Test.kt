import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

@DisplayName("Day 19")
class Day19Test {
    private val example = readText("day19_example.txt")
    private val input = readText("day19.txt")
    private val day = Day19()

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
            assertEquals(129, answer)
        }
    }

    @Nested
    @DisplayName("Part 2")
    inner class Part2 {
        @Test
        fun `Matches solution`() {
            val answer = day.part2(input)
            assertEquals(243, answer)
        }
    }
}
