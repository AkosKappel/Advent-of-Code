import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

@DisplayName("Day 23")
class Day23Test {
    private val example = readText("day23_example.txt")
    private val input = readText("day23.txt")
    private val day = Day23()

    @Nested
    @DisplayName("Part 1")
    inner class Part1 {
        @Test
        fun `Matches example 1`() {
            val answer = day.part1(example, 10)
            assertEquals(92_658_374, answer)
        }

        @Test
        fun `Matches example 2`() {
            val answer = day.part1(example, 100)
            assertEquals(67_384_529, answer)
        }

        @Test
        fun `Matches solution`() {
            val answer = day.part1(input, 100)
            assertEquals(47_382_659, answer)
        }
    }

    @Nested
    @DisplayName("Part 2")
    inner class Part2 {
        @Test
        fun `Matches example`() {
            val answer = day.part2(example, 10_000_000)
            assertEquals(149_245_887_792, answer)
        }

        @Test
        fun `Matches solution`() {
            val answer = day.part2(input, 10_000_000)
            assertEquals(42_271_866_720, answer)
        }
    }
}
