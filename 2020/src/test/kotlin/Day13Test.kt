import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

@DisplayName("Day 13")
class Day13Test {
    private val example1 = readText("day13_example1.txt")
    private val example2 = readText("day13_example2.txt")
    private val example3 = readText("day13_example3.txt")
    private val example4 = readText("day13_example4.txt")
    private val example5 = readText("day13_example5.txt")
    private val example6 = readText("day13_example6.txt")
    private val input = readText("day13.txt")
    private val day = Day13()

    @Nested
    @DisplayName("Part 1")
    inner class Part1 {
        @Test
        fun `Matches example 1`() {
            val answer = day.part1(example1)
            assertEquals(295, answer)
        }

        @Test
        fun `Matches solution`() {
            val answer = day.part1(input)
            assertEquals(3789, answer)
        }
    }

    @Nested
    @DisplayName("Part 2")
    inner class Part2 {
        @Test
        fun `Matches example 1`() {
            val answer = day.part2(example1)
            assertEquals(1_068_781, answer)
        }

        @Test
        fun `Matches example 2`() {
            val answer = day.part2(example2)
            assertEquals(3417, answer)
        }

        @Test
        fun `Matches example 3`() {
            val answer = day.part2(example3)
            assertEquals(754018, answer)
        }

        @Test
        fun `Matches example 4`() {
            val answer = day.part2(example4)
            assertEquals(779210, answer)
        }

        @Test
        fun `Matches example 5`() {
            val answer = day.part2(example5)
            assertEquals(1_261_476, answer)
        }

        @Test
        fun `Matches example 6`() {
            val answer = day.part2(example6)
            assertEquals(1_202_161_486, answer)
        }

        @Test
        fun `Matches solution`() {
            val answer = day.part2(input)
            assertEquals(667_437_230_788_118, answer)
        }
    }
}
