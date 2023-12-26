import os
import sys

if len(sys.argv) != 2:
    print("Usage: python template.py <day>")
    sys.exit(1)

day = int(sys.argv[1])

src_folder = 'src/main/kotlin/'
test_folder = 'src/test/kotlin/'
resources_folder = 'src/main/resources/'

src_file = src_folder + f"Day{day:02}.kt"
test_file = test_folder + f"Day{day:02}Test.kt"
input_file = resources_folder + f"day{day:02}.txt"
example_file = resources_folder + f"day{day:02}_example.txt"

src_content = """
class Day01 {

    fun part1(input: String): Int = 0

    fun part2(input: String): Int = 0
}

fun main() {
    val day = Day01()
    val input = readText("day01_example.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")

//    val startPart2 = System.currentTimeMillis()
//    val answerPart2 = day.part2(input)
//    val endPart2 = System.currentTimeMillis()
//    println("Part 2: $answerPart2 (${endPart2 - startPart2} ms)")
}
"""[1:].replace("Day01", f"Day{day:02}").replace("day01", f"day{day:02}")

test_content = """
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

@DisplayName("Day 1")
class Day01Test {
    private val example = readText("day01_example.txt")
    private val input = readText("day01.txt")
    private val day = Day01()

    @Nested
    @DisplayName("Part 1")
    inner class Part1 {
        @Test
        fun `Matches example`() {
            val answer = day.part1(example)
            assertEquals(0, answer)
        }

        @Test
        fun `Matches solution`() {
            val answer = day.part1(input)
            assertEquals(0, answer)
        }
    }

    @Nested
    @DisplayName("Part 2")
    inner class Part2 {
        @Test
        fun `Matches example`() {
            val answer = day.part2(example)
            assertEquals(0, answer)
        }

        @Test
        fun `Matches solution`() {
            val answer = day.part2(input)
            assertEquals(0, answer)
        }
    }
}
"""[1:].replace("Day01", f"Day{day:02}").replace("day01", f"day{day:02}").replace('("Day 1")', f'("Day {day}")')


for (file, content) in zip((src_file, test_file, input_file, example_file), (src_content, test_content, "", "")):
    if os.path.exists(file):
        ans = input(f"{file} already exists. Overwrite? [y/n] ")
        if ans[0].lower() != "y":
            print("Skipping...")
            continue

    with open(file, "w") as f:
        f.write(content)
    print(f"Created {file}")
