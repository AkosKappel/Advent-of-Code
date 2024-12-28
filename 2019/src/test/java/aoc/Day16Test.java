package aoc;

import org.junit.jupiter.api.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.assertEquals;

class Day16Test {
    private static String example;
    private static String example2;
    private static String example3;
    private static String example4;
    private static String example5;
    private static String example6;
    private static String example7;
    private static String input;
    private Day16 day;

    @BeforeAll
    public static void init() throws IOException {
        example = Files.readString(Paths.get("src/main/resources/day16_example.txt"), StandardCharsets.UTF_8);
        example2 = Files.readString(Paths.get("src/main/resources/day16_example2.txt"), StandardCharsets.UTF_8);
        example3 = Files.readString(Paths.get("src/main/resources/day16_example3.txt"), StandardCharsets.UTF_8);
        example4 = Files.readString(Paths.get("src/main/resources/day16_example4.txt"), StandardCharsets.UTF_8);
        example5 = Files.readString(Paths.get("src/main/resources/day16_example5.txt"), StandardCharsets.UTF_8);
        example6 = Files.readString(Paths.get("src/main/resources/day16_example6.txt"), StandardCharsets.UTF_8);
        example7 = Files.readString(Paths.get("src/main/resources/day16_example7.txt"), StandardCharsets.UTF_8);
        input = Files.readString(Paths.get("src/main/resources/day16.txt"), StandardCharsets.UTF_8);
    }

    @BeforeEach
    public void setup() {
        day = new Day16();
    }

    @Nested
    @DisplayName("Part 1")
    class Part1Tests {
        @Test
        void testExample() {
            long result = day.part1(example);
            assertEquals(23845678L, result);
        }

        @Test
        void testExample2() {
            long result = day.part1(example2);
            assertEquals(24176176L, result);
        }

        @Test
        void testExample3() {
            long result = day.part1(example3);
            assertEquals(73745418L, result);
        }

        @Test
        void testExample4() {
            long result = day.part1(example4);
            assertEquals(52432133L, result);
        }

        @Test
        void testSolution() {
            long result = day.part1(input);
            assertEquals(34841690L, result);
        }
    }

    @Nested
    @DisplayName("Part 2")
    class Part2Tests {
        @Test
        void testExample5() {
            long result = day.part2(example5);
            assertEquals(84462026L, result);
        }

        @Test
        void testExample6() {
            long result = day.part2(example6);
            assertEquals(78725270L, result);
        }

        @Test
        void testExample7() {
            long result = day.part2(example7);
            assertEquals(53553731L, result);
        }

        @Test
        void testSolution() {
            long result = day.part2(input);
            assertEquals(48776785L, result);
        }
    }
}