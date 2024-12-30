package aoc;

import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.Queue;

public class IntcodeComputer {
    private final long[] initialMemory;
    private long[] memory;
    private long ip = 0;
    private long relativeBase = 0;
    private final Queue<Long> input;
    private final Queue<Long> output;
    private boolean running = true;
    private int outputSize = -1; // let it run until it halts by itself
    private boolean waitForInput = false;

    // Opcodes
    private final static int ADD = 1;
    private final static int MULTIPLY = 2;
    private final static int INPUT = 3;
    private final static int OUTPUT = 4;
    private final static int JUMP_IF_TRUE = 5;
    private final static int JUMP_IF_FALSE = 6;
    private final static int LESS_THAN = 7;
    private final static int EQUALS = 8;
    private final static int RELATIVE_BASE_OFFSET = 9;

    public IntcodeComputer(long[] code) {
        initialMemory = Arrays.copyOf(code, code.length);
        memory = Arrays.copyOf(code, code.length);
        input = new ArrayDeque<>();
        output = new ArrayDeque<>();
    }

    public static IntcodeComputer fromString(String input) {
        return new IntcodeComputer(parse(input));
    }

    public static long[] parse(String input) {
        return Arrays.stream(input.trim().split(","))
                .mapToLong(Long::parseLong)
                .toArray();
    }

    public boolean run(long... args) {
        addInput(args);

        while (running) {
            String instruction = String.format("%05d", getMemoryAt(ip));
            int opcode = Integer.parseInt(instruction.substring(3));

            if (opcode == 99) {
                running = false;
                break;
            }

            int mode1 = instruction.charAt(2) - '0';
            int mode2 = instruction.charAt(1) - '0';
            int mode3 = instruction.charAt(0) - '0';

            long param1 = getMemoryAt(ip + 1);
            long param2 = getMemoryAt(ip + 2);
            long param3 = getMemoryAt(ip + 3);

            switch (opcode) {
                case ADD:
                    write(param3, mode3, read(param1, mode1) + read(param2, mode2));
                    ip += 4;
                    break;
                case MULTIPLY:
                    write(param3, mode3, read(param1, mode1) * read(param2, mode2));
                    ip += 4;
                    break;
                case INPUT:
                    if (input.isEmpty()) {
                        if (waitForInput) return false;
                        throw new IllegalArgumentException("Missing input");
                    }
                    write(param1, mode1, input.poll());
                    ip += 2;
                    break;
                case OUTPUT:
                    output.add(read(param1, mode1));
                    ip += 2;
                    if (output.size() == outputSize) return false;
                    break;
                case JUMP_IF_TRUE:
                    ip = read(param1, mode1) != 0 ? read(param2, mode2) : ip + 3;
                    break;
                case JUMP_IF_FALSE:
                    ip = read(param1, mode1) == 0 ? read(param2, mode2) : ip + 3;
                    break;
                case LESS_THAN:
                    write(param3, mode3, read(param1, mode1) < read(param2, mode2) ? 1 : 0);
                    ip += 4;
                    break;
                case EQUALS:
                    write(param3, mode3, read(param1, mode1) == read(param2, mode2) ? 1 : 0);
                    ip += 4;
                    break;
                case RELATIVE_BASE_OFFSET:
                    relativeBase += read(param1, mode1);
                    ip += 2;
                    break;
                default:
                    throw new IllegalArgumentException("Unknown opcode: " + opcode);
            }
        }

        return true; // finished
    }

    public void addInput(long... numbers) {
        for (long number : numbers) input.add(number);
    }

    public void addInput(String x) {
        x.chars().mapToLong(c -> c).forEach(input::add);
    }


    public Long readOutput() {
        if (output.isEmpty()) throw new IllegalStateException("No output");
        return output.poll();
    }

    public Long readLastOutput() {
        while (output.size() > 1) output.poll();
        return readOutput();
    }

    public void setOutputSize(int size) {
        outputSize = size;
    }

    public void setWaitForInput(boolean wait) {
        waitForInput = wait;
    }

    public boolean isRunning() {
        return running;
    }

    public boolean hasInput() {
        return !input.isEmpty();
    }

    public boolean hasOutput() {
        return !output.isEmpty();
    }

    public Queue<Long> getInput() {
        return input;
    }

    public Queue<Long> getOutput() {
        return output;
    }

    public void clearInput() {
        input.clear();
    }

    public void clearOutput() {
        output.clear();
    }

    public void start() {
        running = true;
    }

    public void stop() {
        running = false;
    }

    public void restart() {
        ip = 0;
        relativeBase = 0;
        running = true;
        input.clear();
        output.clear();
        memory = Arrays.copyOf(initialMemory, initialMemory.length);
    }

    public long[] getMemory() {
        return memory;
    }

    public long getMemoryAt(long address) {
        if (address < 0) return 0;
        if (address >= memory.length) increaseMemory(Math.max(memory.length * 2, (int) address + 1));
        return memory[(int) address];
    }

    public void setMemoryAt(long address, long value) {
        if (address < 0) return; // ignore negative indices
        if (address >= memory.length) increaseMemory(Math.max(memory.length * 2, (int) address + 1));
        memory[(int) address] = value;
    }

    public void increaseMemory(int newSize) {
        long[] newMemory = new long[newSize];
        System.arraycopy(memory, 0, newMemory, 0, memory.length);
        memory = newMemory;
    }

    private long read(long param, int mode) {
        return switch (mode) {
            case 0 -> getMemoryAt(param); // position mode
            case 1 -> param; // immediate mode
            case 2 -> getMemoryAt(param + relativeBase); // relative mode
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
}

