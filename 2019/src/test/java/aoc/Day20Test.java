package aoc;

import org.junit.jupiter.api.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.assertEquals;

class Day20Test {
    private static String example;
    private static String example2;
    private static String example3;
    private static String input;
    private Day20 day;

    @BeforeAll
    public static void init() throws IOException {
        example = Files.readString(Paths.get("src/main/resources/day20_example.txt"), StandardCharsets.UTF_8);
        example2 = Files.readString(Paths.get("src/main/resources/day20_example2.txt"), StandardCharsets.UTF_8);
        example3 = Files.readString(Paths.get("src/main/resources/day20_example3.txt"), StandardCharsets.UTF_8);
        input = Files.readString(Paths.get("src/main/resources/day20.txt"), StandardCharsets.UTF_8);
    }

    @BeforeEach
    public void setup() {
        day = new Day20();
    }

    @Nested
    @DisplayName("Part 1")
    class Part1Tests {
        @Test
        void testExample() {
            long result = day.part1(example);
            assertEquals(23L, result);
        }

        @Test
        void testExample2() {
            long result = day.part1(example2);
            assertEquals(58L, result);
        }

        @Test
        void testSolution() {
            long result = day.part1(input);
            assertEquals(528L, result);
        }
    }

    @Nested
    @DisplayName("Part 2")
    class Part2Tests {
        @Test
        void testExample3() {
            long result = day.part2(example3);
            assertEquals(396L, result);
        }

        @Test
        void testSolution() {
            long result = day.part2(input);
            assertEquals(0L, result);
        }
    }
}