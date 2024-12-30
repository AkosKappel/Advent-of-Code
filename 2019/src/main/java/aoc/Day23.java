package aoc;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;

public class Day23 {
    private static final int NETWORK_SIZE = 50;

    private static class NAT {
        private long x, y, lastY;
        private boolean finished;
        private final boolean firstOnly;

        public NAT(boolean first) {
            firstOnly = first;
        }

        public void receive(long newX, long newY) {
            if (firstOnly) finished = true;
            x = newX;
            y = newY;
        }

        public void verify(IntcodeComputer[] computers, Queue<Long>[] queue) {
            if (!firstOnly && Arrays.stream(computers).noneMatch(IntcodeComputer::hasOutput)) {
                queue[0].add(x);
                queue[0].add(y);
                if (y == lastY) finished = true; // same value twice in a row
                lastY = y;
            }
        }

        public boolean hasFinished() {
            return finished;
        }

        public long getY() {
            return y;
        }
    }

    private void runNetwork(String program, NAT nat) {
        IntcodeComputer[] network = new IntcodeComputer[NETWORK_SIZE];
        Queue<Long>[] messageQueues = new Queue[NETWORK_SIZE];

        for (int i = 0; i < NETWORK_SIZE; i++) {
            IntcodeComputer computer = IntcodeComputer.fromString(program);
            computer.setWaitForInput(true);
            computer.addInput(i);
            computer.run();
            network[i] = computer;
            messageQueues[i] = new LinkedList<>();
        }

        while (!nat.hasFinished()) {
            for (int i = 0; i < NETWORK_SIZE; i++) {
                while (network[i].hasOutput()) {
                    long address = network[i].readOutput();
                    long x = network[i].readOutput();
                    long y = network[i].readOutput();

                    if (address == 255) {
                        nat.receive(x, y);
                    } else if (address < NETWORK_SIZE) {
                        messageQueues[(int) address].add(x);
                        messageQueues[(int) address].add(y);
                    }
                }
            }

            for (int i = 0; i < NETWORK_SIZE; i++) {
                Queue<Long> queue = messageQueues[i];
                while (!queue.isEmpty()) network[i].addInput(queue.poll());
                network[i].addInput(-1);
                network[i].run();
            }

            nat.verify(network, messageQueues);
        }
    }

    public long part1(String input) {
        NAT nat = new NAT(true);
        runNetwork(input, nat);
        return nat.getY();
    }

    public long part2(String input) {
        NAT nat = new NAT(false);
        runNetwork(input, nat);
        return nat.getY();
    }

    public static void main(String[] args) throws Exception {
        Day23 day = new Day23();
        String filepath = "src/main/resources/day23.txt";
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