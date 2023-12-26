import kotlin.math.pow

class Day14 {

    fun part1(input: String): Long = input
        .lines()
        .fold(Pair("", mutableMapOf<Int, Long>())) { (mask, memory), line ->
            if (line.startsWith("mask")) {
                val newMask = line.split(" = ")[1]
                Pair(newMask, memory)
            } else {
                val (addressStr, valueStr) = line.split(" = ")
                val address = addressStr.substring(4, addressStr.length - 1).toInt()
                val valueBits = valueStr.toLong()
                    .toString(2)
                    .padStart(36, '0')

                val maskedValue = mask.mapIndexed { index, c ->
                    when (c) {
                        'X' -> valueBits[index]
                        else -> c
                    }
                }.joinToString("")

                memory[address] = maskedValue.toLong(2)
                Pair(mask, memory)
            }
        }.second.values.sum()

    fun part2(input: String): Long = input
        .lines()
        .fold(Pair("", mutableMapOf<Long, Long>())) { (mask, memory), line ->
            if (line.startsWith("mask")) {
                val newMask = line.split(" = ")[1]
                Pair(newMask, memory)
            } else {
                val (addressStr, valueStr) = line.split(" = ")
                val addressBits = addressStr.substring(4, addressStr.length - 1).toLong()
                    .toString(2)
                    .padStart(36, '0')
                val value = valueStr.toLong()

                val maskedAddress = mask.mapIndexed { index, c ->
                    when (c) {
                        '0' -> addressBits[index]
                        else -> c
                    }
                }.joinToString("")

                val floatingBits = maskedAddress.count { it == 'X' }
                val addresses = (0..<2.pow(floatingBits)).map { i ->
                    val bits = i.toString(2).padStart(floatingBits, '0')
                    bits.foldIndexed(maskedAddress) { index, address, _ ->
                        address.replaceFirst('X', bits[index])
                    }.toLong(2)
                }

                addresses.forEach { memory[it] = value }
                Pair(mask, memory)
            }
        }.second.values.sum()

    private fun Int.pow(exponent: Int): Long = this.toDouble().pow(exponent.toDouble()).toLong()
}

fun main() {
    val day = Day14()
    val input = readText("day14.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")

    val startPart2 = System.currentTimeMillis()
    val answerPart2 = day.part2(input)
    val endPart2 = System.currentTimeMillis()
    println("Part 2: $answerPart2 (${endPart2 - startPart2} ms)")
}
