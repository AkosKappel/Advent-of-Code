import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

@DisplayName("Day 18")
class Day18Test {
    private val example1 = readText("day18_example1.txt")
    private val example2 = readText("day18_example2.txt")
    private val example3 = readText("day18_example3.txt")
    private val example4 = readText("day18_example4.txt")
    private val example5 = readText("day18_example5.txt")
    private val example6 = readText("day18_example6.txt")
    private val input = readText("day18.txt")
    private val day = Day18()

    @Nested
    @DisplayName("Part 1")
    inner class Part1 {
        @Test
        fun `Matches example 1`() {
            val answer = day.part1(example1)
            assertEquals(71, answer)
        }

        @Test
        fun `Matches example 2`() {
            val answer = day.part1(example2)
            assertEquals(51, answer)
        }

        @Test
        fun `Matches example 3`() {
            val answer = day.part1(example3)
            assertEquals(26, answer)
        }

        @Test
        fun `Matches example 4`() {
            val answer = day.part1(example4)
            assertEquals(437, answer)
        }

        @Test
        fun `Matches example 5`() {
            val answer = day.part1(example5)
            assertEquals(12240, answer)
        }

        @Test
        fun `Matches example 6`() {
            val answer = day.part1(example6)
            assertEquals(13632, answer)
        }

        @Test
        fun `Matches solution`() {
            val answer = day.part1(input)
            assertEquals(6_640_667_297_513, answer)
        }
    }

    @Nested
    @DisplayName("Part 2")
    inner class Part2 {
        @Test
        fun `Matches example 1`() {
            val answer = day.part2(example1)
            assertEquals(231, answer)
        }

        @Test
        fun `Matches example 2`() {
            val answer = day.part2(example2)
            assertEquals(51, answer)
        }

        @Test
        fun `Matches example 3`() {
            val answer = day.part2(example3)
            assertEquals(46, answer)
        }

        @Test
        fun `Matches example 4`() {
            val answer = day.part2(example4)
            assertEquals(1445, answer)
        }

        @Test
        fun `Matches example 5`() {
            val answer = day.part2(example5)
            assertEquals(669060, answer)
        }

        @Test
        fun `Matches example 6`() {
            val answer = day.part2(example6)
            assertEquals(23340, answer)
        }

        @Test
        fun `Matches solution`() {
            val answer = day.part2(input)
            assertEquals(451_589_894_841_552, answer)
        }
    }
}
