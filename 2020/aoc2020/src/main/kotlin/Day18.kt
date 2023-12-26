class Day18 {

    private fun evaluateBasic(expression: List<Any>, index: Int = 0): Pair<Long, Int> {
        var result = 0L
        var operator = "+"

        fun updateResult(token: Any) {
            result = when (operator) {
                "+" -> result + token as Long
                "*" -> result * token as Long
                else -> error("Unknown operator: $operator")
            }
        }

        var i = index
        while (i < expression.size) {
            when (val token = expression[i]) {
                is Long -> updateResult(token)

                "(" -> {
                    val (value, newIndex) = evaluateBasic(expression, i + 1)
                    updateResult(value)
                    i = newIndex
                }

                ")" -> return result to i
                "+" -> operator = "+"
                "*" -> operator = "*"
                else -> error("Unknown token: $token")
            }
            i++
        }

        return result to i
    }

    private fun infixToRPN(expression: List<Any>): List<Any> {
        val rpn = mutableListOf<Any>()
        val stack = mutableListOf<Any>()

        val precedence = { token: String ->
            when (token) {
                "*" -> 1
                "+" -> 2
                else -> 0
            }
        }

        expression.forEach { token ->
            when (token) {
                is Long -> rpn.add(token)
                "(" -> stack.add(token)
                ")" -> {
                    while (stack.last() != "(") {
                        rpn.add(stack.removeLast())
                    }
                    stack.removeLast()
                }

                "+", "*" -> {
                    while (stack.isNotEmpty() && stack.last() != "(" &&
                        precedence(token as String) <= precedence(stack.last() as String)
                    ) {
                        rpn.add(stack.removeLast())
                    }
                    stack.add(token)
                }
            }
        }

        while (stack.isNotEmpty()) {
            rpn.add(stack.removeLast())
        }

        return rpn
    }

    private fun evaluateAdvanced(expression: List<Any>): Long {
        val rpn = infixToRPN(expression)
        val stack = mutableListOf<Long>()

        rpn.forEach { token ->
            when (token) {
                is Long -> stack.add(token)
                "+" -> {
                    val a = stack.removeLast()
                    val b = stack.removeLast()
                    stack.add(a + b)
                }

                "*" -> {
                    val a = stack.removeLast()
                    val b = stack.removeLast()
                    stack.add(a * b)
                }
            }
        }

        return stack.removeLast()
    }

    private fun evaluate(expression: String, advanced: Boolean = false): Long = expression
        .replace("(", "( ")
        .replace(")", " )")
        .split(" ")
        .filter { it.isNotBlank() }
        .map { it.toLongOrNull() ?: it }
        .let { if (!advanced) evaluateBasic(it).first else evaluateAdvanced(it) }

    fun part1(input: String): Long = input.lines().sumOf { evaluate(it) }

    fun part2(input: String): Long = input.lines().sumOf { evaluate(it, advanced = true) }
}

fun main() {
    val day = Day18()
    val input = readText("day18.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")

    val startPart2 = System.currentTimeMillis()
    val answerPart2 = day.part2(input)
    val endPart2 = System.currentTimeMillis()
    println("Part 2: $answerPart2 (${endPart2 - startPart2} ms)")
}
