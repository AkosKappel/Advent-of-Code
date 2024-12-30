package aoc;

import aoc.utils.Pair;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.regex.Pattern;

public class Day22 {
    private BigInteger mod(BigInteger a, BigInteger m) {
        return a.mod(m).add(m).mod(m);
    }

    private BigInteger modInv(BigInteger a, BigInteger m) {
        return a.modPow(m.subtract(BigInteger.TWO), m);
    }

    private Pair<BigInteger, BigInteger> parse(String input, long m, long n) {
        BigInteger a = BigInteger.ONE;
        BigInteger b = BigInteger.ZERO;
        BigInteger modM = BigInteger.valueOf(m);
        Pattern p = Pattern.compile("-?\\d+");

        for (String line : input.split("\\n")) {
            if (line.contains("new")) {
                a = a.negate();
                b = modM.subtract(b).subtract(BigInteger.ONE);
                continue;
            }

            long i = Long.parseLong(p.matcher(line).find() ? line.replaceAll("[^-?\\d]", "") : "0");

            if (line.contains("cut")) {
                b = modM.add(b).subtract(BigInteger.valueOf(i));
                continue;
            }

            if (line.contains("increment")) {
                BigInteger inc = BigInteger.valueOf(i);
                a = a.multiply(inc);
                b = b.multiply(inc);
                continue;
            }

            throw new IllegalArgumentException("Unknown line: " + line);
        }

        BigInteger resultA = a.modPow(BigInteger.valueOf(n), modM);
        BigInteger resultB = b
                .multiply(resultA.subtract(BigInteger.ONE))
                .multiply(modInv(a.subtract(BigInteger.ONE), modM))
                .mod(modM);

        return new Pair<>(resultA, resultB);
    }

    public BigInteger part1(String input) {
        long numCards = 10007, index = 2019, repetitions = 1;

        Pair<BigInteger, BigInteger> parsed = parse(input, numCards, repetitions);
        BigInteger a = parsed.first();
        BigInteger b = parsed.second();

        return mod(a.multiply(BigInteger.valueOf(index)).add(b), BigInteger.valueOf(numCards));
    }

    public BigInteger part2(String input) {
        long numCards = 119315717514047L, index = 2020, repetitions = 101741582076661L;

        Pair<BigInteger, BigInteger> parsed = parse(input, numCards, repetitions);
        BigInteger a = parsed.first();
        BigInteger b = parsed.second();

        return mod(modInv(a, BigInteger.valueOf(numCards)).multiply(BigInteger.valueOf(index).subtract(b)), BigInteger.valueOf(numCards));
    }

    public static void main(String[] args) throws Exception {
        Day22 day = new Day22();
        String filepath = "src/main/resources/day22.txt";
        String input = Files.readString(Paths.get(filepath), StandardCharsets.UTF_8);

        long startPart1 = System.currentTimeMillis();
        BigInteger resultPart1 = day.part1(input);
        long endPart1 = System.currentTimeMillis();
        System.out.println("Part 1: " + resultPart1 + " (" + (endPart1 - startPart1) + " ms)");

        long startPart2 = System.currentTimeMillis();
        BigInteger resultPart2 = day.part2(input);
        long endPart2 = System.currentTimeMillis();
        System.out.println("Part 2: " + resultPart2 + " (" + (endPart2 - startPart2) + " ms)");
    }
}