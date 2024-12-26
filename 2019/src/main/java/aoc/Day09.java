package aoc;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Queue;
import java.util.stream.Collectors;

public class Day09 {
    private static long[] parse(String input) {
        return Arrays.stream(input.trim().split(","))
                .mapToLong(Long::parseLong)
                .toArray();
    }

    private static class IntcodeComputer {
        private long[] program;
        private long ip = 0;
        private long relativeBase = 0;
        private final Queue<Long> input;
        private final Queue<Long> output;
        private boolean isRunning = true;

        public IntcodeComputer(long[] program, long[] input) {
            this.program = program;
            this.input = new ArrayDeque<>();
            for (long i : input) this.input.add(i);
            this.output = new ArrayDeque<>();
        }

        public Long getOutput() {
            return output.poll();
        }

        private void increaseMemory(int newSize) {
            long[] newMemory = new long[newSize];
            System.arraycopy(program, 0, newMemory, 0, program.length);
            program = newMemory;
        }

        private long memoryAt(long address) {
            if (address < 0) return 0;
            if (address >= program.length) increaseMemory(Math.max(program.length * 2, (int) address + 1));
            return program[(int) address];
        }

        private void setMemoryAt(long address, long value) {
            if (address < 0) return; // ignore negative indices
            if (address >= program.length) increaseMemory(Math.max(program.length * 2, (int) address + 1));
            program[(int) address] = value;
        }

        private long read(long param, int mode) {
            return switch (mode) {
                case 0 -> memoryAt(param); // position mode
                case 1 -> param; // immediate mode
                case 2 -> memoryAt(param + relativeBase); // relative mode
                default -> throw new IllegalArgumentException("Invalid parameter mode for read operation: " + mode);
            };
        }

        private void write(long param, int mode, long value) {
            switch (mode) {
                case 0 -> setMemoryAt(param, value);
                case 2 -> setMemoryAt(param + relativeBase, value);
                default -> throw new IllegalArgumentException("Invalid parameter mode for write operation: " + mode);
            }
        }

        private void run(long[] args) {
            for (long arg : args) input.add(arg);
            while (isRunning) {
                String instruction = String.format("%05d", memoryAt(ip));
                int opcode = Integer.parseInt(instruction.substring(3));

                if (opcode == 99) {
                    isRunning = false;
                    return;
                }

                int mode1 = instruction.charAt(2) - '0';
                int mode2 = instruction.charAt(1) - '0';
                int mode3 = instruction.charAt(0) - '0';

                long param1 = memoryAt(ip + 1);
                long param2 = memoryAt(ip + 2);
                long param3 = memoryAt(ip + 3);

                switch (opcode) {
                    case 1:
                        write(param3, mode3, read(param1, mode1) + read(param2, mode2));
                        ip += 4;
                        break;
                    case 2:
                        write(param3, mode3, read(param1, mode1) * read(param2, mode2));
                        ip += 4;
                        break;
                    case 3:
                        if (input.isEmpty()) throw new IllegalArgumentException("Missing input");
                        write(param1, mode1, input.poll());
                        ip += 2;
                        break;
                    case 4:
                        output.add(read(param1, mode1));
                        ip += 2;
                        break;
                    case 5:
                        ip = read(param1, mode1) != 0 ? read(param2, mode2) : ip + 3;
                        break;
                    case 6:
                        ip = read(param1, mode1) == 0 ? read(param2, mode2) : ip + 3;
                        break;
                    case 7:
                        write(param3, mode3, read(param1, mode1) < read(param2, mode2) ? 1 : 0);
                        ip += 4;
                        break;
                    case 8:
                        write(param3, mode3, read(param1, mode1) == read(param2, mode2) ? 1 : 0);
                        ip += 4;
                        break;
                    case 9:
                        relativeBase += read(param1, mode1);
                        ip += 2;
                        break;
                    default:
                        throw new IllegalArgumentException("Unknown opcode: " + opcode);
                }
            }
        }
    }

    public String part1(String input) {
        IntcodeComputer computer = new IntcodeComputer(parse(input), new long[]{1L});
        computer.run(new long[0]);
        return computer.output.stream().map(String::valueOf).collect(Collectors.joining(","));
    }

    public long part2(String input) {
        IntcodeComputer computer = new IntcodeComputer(parse(input), new long[]{2L});
        computer.run(new long[0]);
        return computer.getOutput();
    }

    public static void main(String[] args) throws Exception {
        Day09 day = new Day09();
        String filepath = "src/main/resources/day09.txt";
        String input = Files.readString(Paths.get(filepath), StandardCharsets.UTF_8);

        long startPart1 = System.currentTimeMillis();
        String resultPart1 = day.part1(input);
        long endPart1 = System.currentTimeMillis();
        System.out.println("Part 1: " + resultPart1 + " (" + (endPart1 - startPart1) + " ms)");

        long startPart2 = System.currentTimeMillis();
        long resultPart2 = day.part2(input);
        long endPart2 = System.currentTimeMillis();
        System.out.println("Part 2: " + resultPart2 + " (" + (endPart2 - startPart2) + " ms)");
    }
}