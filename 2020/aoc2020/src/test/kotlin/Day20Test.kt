import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

@DisplayName("Day 20")
class Day20Test {
    private val example = readText("day20_example.txt")
    private val input = readText("day20.txt")
    private val day = Day20()

    @Nested
    @DisplayName("Part 1")
    inner class Part1 {
        @Test
        fun `Matches example`() {
            val answer = day.part1(example)
            assertEquals(20_899_048_083_289, answer)
        }

        @Test
        fun `Matches solution`() {
            val answer = day.part1(input)
            assertEquals(17_032_646_100_079, answer)
        }
    }

    @Nested
    @DisplayName("Part 2")
    inner class Part2 {
        @Test
        fun `Matches example`() {
            val answer = day.part2(example)
            assertEquals(273, answer)
        }

        @Test
        fun `Matches solution`() {
            val answer = day.part2(input)
            assertEquals(2006, answer)
        }
    }
}
