import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

@DisplayName("Day 15")
class Day15Test {
    private val example1 = readText("day15_example1.txt")
    private val example2 = readText("day15_example2.txt")
    private val example3 = readText("day15_example3.txt")
    private val example4 = readText("day15_example4.txt")
    private val example5 = readText("day15_example5.txt")
    private val example6 = readText("day15_example6.txt")
    private val example7 = readText("day15_example7.txt")
    private val input = readText("day15.txt")
    private val day = Day15()

    @Nested
    @DisplayName("Part 1")
    inner class Part1 {
        @Test
        fun `Matches example 1`() {
            val answer = day.part1(example1)
            assertEquals(436, answer)
        }

        @Test
        fun `Matches example 2`() {
            val answer = day.part1(example2)
            assertEquals(1, answer)
        }

        @Test
        fun `Matches example 3`() {
            val answer = day.part1(example3)
            assertEquals(10, answer)
        }

        @Test
        fun `Matches example 4`() {
            val answer = day.part1(example4)
            assertEquals(27, answer)
        }


        @Test
        fun `Matches example 5`() {
            val answer = day.part1(example5)
            assertEquals(78, answer)
        }

        @Test
        fun `Matches example 6`() {
            val answer = day.part1(example6)
            assertEquals(438, answer)
        }

        @Test
        fun `Matches example 7`() {
            val answer = day.part1(example7)
            assertEquals(1836, answer)
        }

        @Test
        fun `Matches solution`() {
            val answer = day.part1(input)
            assertEquals(1294, answer)
        }
    }

    @Nested
    @DisplayName("Part 2")
    inner class Part2 {
        @Test
        fun `Matches example 1`() {
            val answer = day.part2(example1)
            assertEquals(175594, answer)
        }

        @Test
        fun `Matches example 2`() {
            val answer = day.part2(example2)
            assertEquals(2578, answer)
        }

        @Test
        fun `Matches example 3`() {
            val answer = day.part2(example3)
            assertEquals(3_544_142, answer)
        }

        @Test
        fun `Matches example 4`() {
            val answer = day.part2(example4)
            assertEquals(261214, answer)
        }

        @Test
        fun `Matches example 5`() {
            val answer = day.part2(example5)
            assertEquals(6_895_259, answer)
        }

        @Test
        fun `Matches example 6`() {
            val answer = day.part2(example6)
            assertEquals(18, answer)
        }

        @Test
        fun `Matches example 7`() {
            val answer = day.part2(example7)
            assertEquals(362, answer)
        }

        @Test
        fun `Matches solution`() {
            val answer = day.part2(input)
            assertEquals(573522, answer)
        }
    }
}
