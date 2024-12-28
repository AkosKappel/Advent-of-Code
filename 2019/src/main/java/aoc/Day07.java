package aoc;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;

public class Day07 {
    private static int[] parse(String input) {
        return Arrays.stream(input.trim().split(","))
                .mapToInt(Integer::parseInt)
                .toArray();
    }

    private static class IntcodeComputer {
        private final int[] program;
        private int ip = 0;
        private final Queue<Integer> input;
        private final Queue<Integer> output;
        private boolean isRunning = true;

        public IntcodeComputer(int[] program, int[] input) {
            this.program = program;
            this.input = new ArrayDeque<>();
            for (int i : input) this.input.add(i);
            this.output = new ArrayDeque<>();
        }

        public Integer getOutput() {
            return output.poll();
        }

        private int read(int param, int mode) {
            return switch (mode) {
                case 0 -> program[param];
                case 1 -> param;
                default -> throw new IllegalArgumentException();
            };
        }

        private void run(int[] args) {
            for (int arg : args) input.add(arg);

            while (ip < program.length && isRunning) {
                int opcode = program[ip] % 100;
                int paramModes = program[ip] / 100;

                if (opcode == 99) {
                    isRunning = false;
                    return;
                }

                int param1 = program[(ip + 1) % program.length];
                int param2 = program[(ip + 2) % program.length];
                int param3 = program[(ip + 3) % program.length];

                int mode1 = paramModes % 10;
                int mode2 = (paramModes / 10) % 10;
                int mode3 = (paramModes / 100) % 10;

                switch (opcode) {
                    case 1:
                        program[param3] = read(param1, mode1) + read(param2, mode2);
                        ip += 4;
                        break;
                    case 2:
                        program[param3] = read(param1, mode1) * read(param2, mode2);
                        ip += 4;
                        break;
                    case 3:
                        if (!input.isEmpty()) program[program[ip + 1]] = input.poll();
                        ip += 2;
                        break;
                    case 4:
                        output.add(read(param1, mode1));
                        ip += 2;
                        return;
                    case 5:
                        ip = read(param1, mode1) != 0 ? read(param2, mode2) : ip + 3;
                        break;
                    case 6:
                        ip = read(param1, mode1) == 0 ? read(param2, mode2) : ip + 3;
                        break;
                    case 7:
                        program[param3] = read(param1, mode1) < read(param2, mode2) ? 1 : 0;
                        ip += 4;
                        break;
                    case 8:
                        program[param3] = read(param1, mode1) == read(param2, mode2) ? 1 : 0;
                        ip += 4;
                        break;
                }
            }
        }
    }

    public long part1(String input) {
        int highestSignal = Integer.MIN_VALUE;
        Permutations<Integer> permutations = new Permutations<>(new Integer[]{0, 1, 2, 3, 4});

        for (List<Integer> sequence : permutations) {
            List<IntcodeComputer> computers = new ArrayList<>();
            for (int phase : sequence) {
                int[] program = parse(input);
                IntcodeComputer computer = new IntcodeComputer(program, new int[]{phase});
                computers.add(computer);
            }

            Integer outputSignal = 0;
            for (int i = 0; i < sequence.size(); i++) {
                computers.get(i).run(new int[]{outputSignal});
                outputSignal = computers.get(i).getOutput();
            }

            highestSignal = Math.max(highestSignal, outputSignal);
        }

        return highestSignal;
    }

    public long part2(String input) {
        int highestSignal = Integer.MIN_VALUE;
        Permutations<Integer> permutations = new Permutations<>(new Integer[]{5, 6, 7, 8, 9});

        for (List<Integer> sequence : permutations) {
            List<IntcodeComputer> computers = new ArrayList<>();
            for (int phase : sequence) {
                int[] program = parse(input);
                IntcodeComputer computer = new IntcodeComputer(program, new int[]{phase});
                computers.add(computer);
            }

            Integer outputSignal = 0;

            cycle:
            while (true) {
                for (IntcodeComputer computer : computers) {
                    computer.run(new int[]{outputSignal});
                    if (!computer.isRunning) break cycle;
                    outputSignal = computer.getOutput();
                }
            }

            highestSignal = Math.max(highestSignal, outputSignal);
        }

        return highestSignal;
    }

    public static void main(String[] args) throws Exception {
        Day07 day = new Day07();
        String filepath = "src/main/resources/day07.txt";
        String input = Files.readString(Paths.get(filepath), StandardCharsets.UTF_8);

        long startPart1 = System.currentTimeMillis();
        long resultPart1 = day.part1(input);
        long endPart1 = System.currentTimeMillis();
        System.out.println("Part 1: " + resultPart1 + " (" + (endPart1 - startPart1) + " ms)");

        long startPart2 = System.currentTimeMillis();
        long resultPart2 = day.part2(input);
        long endPart2 = System.currentTimeMillis();
        System.out.println("Part 2: " + resultPart2 + " (" + (endPart2 - startPart2) + " ms)");
    }
}