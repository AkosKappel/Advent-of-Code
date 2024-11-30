import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

@DisplayName("Day 21")
class Day21Test {
    private val example = readText("day21_example.txt")
    private val input = readText("day21.txt")
    private val day = Day21()

    @Nested
    @DisplayName("Part 1")
    inner class Part1 {
        @Test
        fun `Matches example`() {
            val answer = day.part1(example)
            assertEquals(5, answer)
        }

        @Test
        fun `Matches solution`() {
            val answer = day.part1(input)
            assertEquals(2595, answer)
        }
    }

    @Nested
    @DisplayName("Part 2")
    inner class Part2 {
        @Test
        fun `Matches example`() {
            val answer = day.part2(example)
            assertEquals("mxmxvkd,sqjhc,fvjkl", answer)
        }

        @Test
        fun `Matches solution`() {
            val answer = day.part2(input)
            assertEquals("thvm,jmdg,qrsczjv,hlmvqh,zmb,mrfxh,ckqq,zrgzf", answer)
        }
    }
}
