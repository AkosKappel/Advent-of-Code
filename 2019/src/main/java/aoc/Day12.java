package aoc;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.function.Function;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Day12 {
    private static final Pattern MOON_PATTERN = Pattern.compile("<x=(-?\\d+), y=(-?\\d+), z=(-?\\d+)>");

    private static class Moon {
        private long posX;
        private long posY;
        private long posZ;

        private long velX = 0;
        private long velY = 0;
        private long velZ = 0;

        public Moon(long x, long y, long z) {
            posX = x;
            posY = y;
            posZ = z;
        }

        public long getPosX() {
            return posX;
        }

        public long getPosY() {
            return posY;
        }

        public long getPosZ() {
            return posZ;
        }

        public long getVelX() {
            return velX;
        }

        public long getVelY() {
            return velY;
        }

        public long getVelZ() {
            return velZ;
        }

        public static Moon fromString(String str) {
            Matcher m = MOON_PATTERN.matcher(str);
            if (m.matches()) {
                return new Moon(Long.parseLong(m.group(1)), Long.parseLong(m.group(2)), Long.parseLong(m.group(3)));
            }
            throw new IllegalArgumentException("Invalid moon: " + str);
        }

        public void applyGravity(Moon[] others) {
            for (Moon other : others) {
                velX += Long.compare(other.posX, posX);
                velY += Long.compare(other.posY, posY);
                velZ += Long.compare(other.posZ, posZ);
            }
        }

        public void applyVelocity() {
            posX += velX;
            posY += velY;
            posZ += velZ;
        }

        public long getEnergy() {
            long potential = Math.abs(posX) + Math.abs(posY) + Math.abs(posZ);
            long kinetic = Math.abs(velX) + Math.abs(velY) + Math.abs(velZ);
            return potential * kinetic;
        }
    }

    private static Moon[] parse(String input) {
        String[] lines = input.replaceAll("\r\n", "\n").split("\n");
        Moon[] moons = new Moon[lines.length];
        for (int i = 0; i < lines.length; i++) {
            moons[i] = Moon.fromString(lines[i]);
        }
        return moons;
    }

    public static long GCD(long a, long b) {
        return b == 0 ? a : GCD(b, a % b);
    }

    public static long LCM(long... numbers) {
        return Arrays.stream(numbers).reduce(1, (a, b) -> a * b / GCD(a, b));
    }

    public long part1(String input, int numSteps) {
        Moon[] moons = parse(input);
        for (int i = 0; i < numSteps; i++) {
            for (Moon m : moons) m.applyGravity(moons);
            for (Moon m : moons) m.applyVelocity();
        }

        return Arrays.stream(moons)
                .mapToLong(Moon::getEnergy)
                .sum();
    }

    private long[] createArray(Moon[] moons, Function<Moon, Long> getPos, Function<Moon, Long> getVel) {
        return Arrays.stream(moons)
                .flatMapToLong(m -> Arrays.stream(new long[]{getPos.apply(m), getVel.apply(m)}))
                .toArray();
    }

    public long part2(String input) {
        Moon[] moons = parse(input);

        long[] initialX = createArray(moons, Moon::getPosX, Moon::getVelX);
        long[] initialY = createArray(moons, Moon::getPosY, Moon::getVelY);
        long[] initialZ = createArray(moons, Moon::getPosZ, Moon::getVelZ);

        long periodX = 0;
        long periodY = 0;
        long periodZ = 0;

        int i = 0;
        while (periodX == 0 || periodY == 0 || periodZ == 0) {
            i++;
            for (Moon m : moons) m.applyGravity(moons);
            for (Moon m : moons) m.applyVelocity();

            if (periodX == 0) {
                long[] newX = createArray(moons, Moon::getPosX, Moon::getVelX);
                if (Arrays.equals(initialX, newX)) periodX = i;
            }

            if (periodY == 0) {
                long[] newY = createArray(moons, Moon::getPosY, Moon::getVelY);
                if (Arrays.equals(initialY, newY)) periodY = i;
            }

            if (periodZ == 0) {
                long[] newZ = createArray(moons, Moon::getPosZ, Moon::getVelZ);
                if (Arrays.equals(initialZ, newZ)) periodZ = i;
            }
        }

        return LCM(periodX, periodY, periodZ);
    }

    public static void main(String[] args) throws Exception {
        Day12 day = new Day12();
        String filepath = "src/main/resources/day12.txt";
        String input = Files.readString(Paths.get(filepath), StandardCharsets.UTF_8);

        long startPart1 = System.currentTimeMillis();
        long resultPart1 = day.part1(input, 1000);
        long endPart1 = System.currentTimeMillis();
        System.out.println("Part 1: " + resultPart1 + " (" + (endPart1 - startPart1) + " ms)");

        long startPart2 = System.currentTimeMillis();
        long resultPart2 = day.part2(input);
        long endPart2 = System.currentTimeMillis();
        System.out.println("Part 2: " + resultPart2 + " (" + (endPart2 - startPart2) + " ms)");
    }
}