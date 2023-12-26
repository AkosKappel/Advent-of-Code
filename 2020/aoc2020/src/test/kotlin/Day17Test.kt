import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

@DisplayName("Day 17")
class Day17Test {
    private val example = readText("day17_example.txt")
    private val input = readText("day17.txt")
    private val day = Day17()

    @Nested
    @DisplayName("Part 1")
    inner class Part1 {
        @Test
        fun `Matches example`() {
            val answer = day.part1(example)
            assertEquals(112, answer)
        }

        @Test
        fun `Matches solution`() {
            val answer = day.part1(input)
            assertEquals(333, answer)
        }
    }

    @Nested
    @DisplayName("Part 2")
    inner class Part2 {
        @Test
        fun `Matches example`() {
            val answer = day.part2(example)
            assertEquals(848, answer)
        }

        @Test
        fun `Matches solution`() {
            val answer = day.part2(input)
            assertEquals(2676, answer)
        }
    }
}
