import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

@DisplayName("Day 9")
class Day09Test {
    private val example = readText("day09_example.txt")
    private val input = readText("day09.txt")
    private val day = Day09()

    @Nested
    @DisplayName("Part 1")
    inner class Part1 {
        @Test
        fun `Matches example`() {
            val answer = day.part1(example, 5)
            assertEquals(127, answer)
        }

        @Test
        fun `Matches solution`() {
            val answer = day.part1(input, 25)
            assertEquals(41_682_220, answer)
        }
    }

    @Nested
    @DisplayName("Part 2")
    inner class Part2 {
        @Test
        fun `Matches example`() {
            val answer = day.part2(example, 5)
            assertEquals(62, answer)
        }

        @Test
        fun `Matches solution`() {
            val answer = day.part2(input, 25)
            assertEquals(5_388_976, answer)
        }
    }
}
