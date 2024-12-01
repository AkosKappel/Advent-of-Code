import java.util.ArrayDeque

class Day22 {

    private fun parse(input: String): Pair<ArrayDeque<Int>, ArrayDeque<Int>> {
        val (p1, p2) = input.split("\n\n")
        val player1 = p1.lines().drop(1).map { it.toInt() }
        val player2 = p2.lines().drop(1).map { it.toInt() }
        return ArrayDeque(player1) to ArrayDeque(player2)
    }

    private fun playCombat(
        player1: ArrayDeque<Int>,
        player2: ArrayDeque<Int>,
    ): Pair<ArrayDeque<Int>, ArrayDeque<Int>> {
        val p1 = player1.clone()
        val p2 = player2.clone()
        while (p1.isNotEmpty() && p2.isNotEmpty()) {
            val card1 = p1.removeFirst()
            val card2 = p2.removeFirst()
            if (card1 > card2) {
                p1.addLast(card1)
                p1.addLast(card2)
            } else {
                p2.addLast(card2)
                p2.addLast(card1)
            }
        }
        return p1 to p2
    }

    private fun playRecursiveCombat(
        player1: ArrayDeque<Int>,
        player2: ArrayDeque<Int>,
    ): Pair<ArrayDeque<Int>, ArrayDeque<Int>> {
        val previousRounds = mutableSetOf<Pair<List<Int>, List<Int>>>()
        while (player1.isNotEmpty() && player2.isNotEmpty()) {
            val currentRound = player1.toList() to player2.toList()
            if (currentRound in previousRounds) {
                return player1 to ArrayDeque()
            }
            previousRounds.add(currentRound)

            val card1 = player1.removeFirst()
            val card2 = player2.removeFirst()

            val winner = if (player1.size >= card1 && player2.size >= card2) {
                val sub1 = ArrayDeque(player1.take(card1))
                val sub2 = ArrayDeque(player2.take(card2))
                playRecursiveCombat(sub1, sub2).let { if (it.first.isNotEmpty()) 1 else 2 }
            } else {
                if (card1 > card2) 1 else 2
            }

            if (winner == 1) {
                player1.addLast(card1)
                player1.addLast(card2)
            } else {
                player2.addLast(card2)
                player2.addLast(card1)
            }
        }
        return player1 to player2
    }

    private fun winningScore(player1: ArrayDeque<Int>, player2: ArrayDeque<Int>): Int {
        val winner = player1.ifEmpty { player2 }
        return winner.reversed().mapIndexed { index, i -> (index + 1) * i }.sum()
    }

    fun part1(input: String): Int = parse(input).let { (p1, p2) ->
        val (player1, player2) = playCombat(p1, p2)
        winningScore(player1, player2)
    }

    fun part2(input: String): Int = parse(input).let { (p1, p2) ->
        val (player1, player2) = playRecursiveCombat(p1, p2)
        winningScore(player1, player2)
    }
}

fun main() {
    val day = Day22()
    val input = readText("day22.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")

    val startPart2 = System.currentTimeMillis()
    val answerPart2 = day.part2(input)
    val endPart2 = System.currentTimeMillis()
    println("Part 2: $answerPart2 (${endPart2 - startPart2} ms)")
}
