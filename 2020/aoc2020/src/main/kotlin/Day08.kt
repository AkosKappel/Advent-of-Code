class Day08 {

    data class Instruction(val operation: String, val argument: Int) {
        fun invert(): Instruction = Instruction(if (operation == "jmp") "nop" else "jmp", argument)

        fun execute(accumulator: Int, pointer: Int): Pair<Int, Int> = when (operation) {
            "nop" -> Pair(accumulator, pointer + 1)
            "jmp" -> Pair(accumulator, pointer + argument)
            "acc" -> Pair(accumulator + argument, pointer + 1)
            else -> throw IllegalArgumentException("Unknown operation: $operation")
        }
    }

    private fun parse(input: String): List<Instruction> = input
        .lines()
        .map { line ->
            val (operation, argument) = line.trim().split(" ")
            val sign = argument[0]
            Instruction(operation, argument.substring(1).toInt() * if (sign == '+') 1 else -1)
        }

    inner class Program(private val instructions: List<Instruction>) {
        var accumulator = 0
        private var pointer = 0
        private val visited = mutableSetOf<Int>()

        fun run(): Int {
            while (pointer !in visited && pointer < instructions.size) {
                visited.add(pointer)
                val instruction = instructions[pointer]
                val (newAccumulator, newPointer) = instruction.execute(accumulator, pointer)
                accumulator = newAccumulator
                pointer = newPointer
            }

            return accumulator
        }

        fun isTerminated(): Boolean = pointer == instructions.size
    }

    fun part1(input: String): Int = Program(parse(input)).run()

    fun part2(input: String): Int? {
        val instructions = parse(input)
        for (i in instructions.indices) {
            val instruction = instructions[i]
            if (instruction.operation == "acc") continue

            val newInstructions = instructions.toMutableList()
            // change one instruction from jmp to nop or vice versa
            // and see if the program terminates
            newInstructions[i] = instruction.invert()

            val program = Program(newInstructions)
            program.run()
            if (program.isTerminated()) return program.accumulator
        }

        return null
    }
}

fun main() {
    val day = Day08()
    val input = readText("day08.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")

    val startPart2 = System.currentTimeMillis()
    val answerPart2 = day.part2(input)
    val endPart2 = System.currentTimeMillis()
    println("Part 2: $answerPart2 (${endPart2 - startPart2} ms)")
}
