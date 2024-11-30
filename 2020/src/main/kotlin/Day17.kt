class Day17 {

    private fun parse(input: String): Array<BooleanArray> = input
        .lines()
        .map { line -> line.map { char -> char == '#' }.toBooleanArray() }
        .toTypedArray()

    class Grid3D(private val grid: MutableMap<Int, MutableMap<Int, MutableMap<Int, Boolean>>> = mutableMapOf()) {
        fun get(x: Int, y: Int, z: Int): Boolean = grid.getOrDefault(z, mutableMapOf())
            .getOrDefault(y, mutableMapOf())
            .getOrDefault(x, false)

        fun set(x: Int, y: Int, z: Int, value: Boolean) {
            grid.getOrPut(z) { mutableMapOf() }
                .getOrPut(y) { mutableMapOf() }[x] = value
        }

        private fun xRange(): IntRange = grid.values
            .flatMap { it.values }
            .flatMap { it.keys }
            .min()..grid.values
            .flatMap { it.values }
            .flatMap { it.keys }
            .max()

        private fun yRange(): IntRange = grid.values
            .flatMap { it.keys }
            .min()..grid.values
            .flatMap { it.keys }
            .max()

        private fun zRange(): IntRange = grid.keys.min()..grid.keys.max()

        private fun activeNeighbors(x: Int, y: Int, z: Int): Int =
            (-1..1).flatMap { dz ->
                (-1..1).flatMap { dy ->
                    (-1..1).map { dx ->
                        if (dz == 0 && dy == 0 && dx == 0) {
                            false
                        } else {
                            get(x + dx, y + dy, z + dz)
                        }
                    }
                }
            }.count { it }

        fun step() {
            val newGrid = Grid3D()
            val zRange = zRange().first - 1..zRange().last + 1
            val yRange = yRange().first - 1..yRange().last + 1
            val xRange = xRange().first - 1..xRange().last + 1
            zRange.forEach { z ->
                yRange.forEach { y ->
                    xRange.forEach { x ->
                        val numActiveNeighbors = activeNeighbors(x, y, z)
                        val active = get(x, y, z)
                        newGrid.set(
                            x, y, z, when {
                                active && numActiveNeighbors in 2..3 -> true
                                !active && numActiveNeighbors == 3 -> true
                                else -> false
                            }
                        )
                    }
                }
            }
            grid.clear()
            grid.putAll(newGrid.grid)
        }

        fun countActive(): Int = grid.values
            .flatMap { it.values }
            .flatMap { it.values }
            .count { it }

        override fun toString(): String {
            val sb = StringBuilder()
            val zKeys = grid.keys.sorted()
            val yKeys = grid.values.flatMap { it.keys }.distinct().sorted()
            val xKeys = grid.values.flatMap { it.values }.flatMap { it.keys }.distinct().sorted()
            zKeys.forEach { z ->
                sb.append("z=$z\n")
                yKeys.forEach { y ->
                    xKeys.forEach { x ->
                        sb.append(if (get(x, y, z)) '#' else '.')
                    }
                    sb.append("\n")
                }
                sb.append("\n")
            }
            return sb.toString()
        }
    }

    fun part1(input: String): Int = parse(input)
        .let { initialState ->
            val grid = Grid3D()
            initialState.forEachIndexed { y, row ->
                row.forEachIndexed { x, value ->
                    grid.set(x, y, 0, value)
                }
            }
            repeat(6) { grid.step() }
            grid.countActive()
        }

    class Grid4D(private val grid: MutableMap<Int, MutableMap<Int, MutableMap<Int, MutableMap<Int, Boolean>>>> = mutableMapOf()) {
        fun get(x: Int, y: Int, z: Int, w: Int): Boolean = grid.getOrDefault(w, mutableMapOf())
            .getOrDefault(z, mutableMapOf())
            .getOrDefault(y, mutableMapOf())
            .getOrDefault(x, false)

        fun set(x: Int, y: Int, z: Int, w: Int, value: Boolean) {
            grid.getOrPut(w) { mutableMapOf() }
                .getOrPut(z) { mutableMapOf() }
                .getOrPut(y) { mutableMapOf() }[x] = value
        }

        private fun xRange(): IntRange = grid.values
            .flatMap { it.values }
            .flatMap { it.values }
            .flatMap { it.keys }
            .min()..grid.values
            .flatMap { it.values }
            .flatMap { it.values }
            .flatMap { it.keys }
            .max()

        private fun yRange(): IntRange = grid.values
            .flatMap { it.values }
            .flatMap { it.keys }
            .min()..grid.values
            .flatMap { it.values }
            .flatMap { it.keys }
            .max()

        private fun zRange(): IntRange = grid.values
            .flatMap { it.keys }
            .min()..grid.values
            .flatMap { it.keys }
            .max()

        private fun wRange(): IntRange = grid.keys.min()..grid.keys.max()

        private fun activeNeighbors(x: Int, y: Int, z: Int, w: Int): Int =
            (-1..1).flatMap { dw ->
                (-1..1).flatMap { dz ->
                    (-1..1).flatMap { dy ->
                        (-1..1).map { dx ->
                            if (dw == 0 && dz == 0 && dy == 0 && dx == 0) {
                                false
                            } else {
                                get(x + dx, y + dy, z + dz, w + dw)
                            }
                        }
                    }
                }
            }.count { it }

        fun step() {
            val newGrid = Grid4D()
            val wRange = wRange().first - 1..wRange().last + 1
            val zRange = zRange().first - 1..zRange().last + 1
            val yRange = yRange().first - 1..yRange().last + 1
            val xRange = xRange().first - 1..xRange().last + 1
            wRange.forEach { w ->
                zRange.forEach { z ->
                    yRange.forEach { y ->
                        xRange.forEach { x ->
                            val numActiveNeighbors = activeNeighbors(x, y, z, w)
                            val active = get(x, y, z, w)
                            newGrid.set(
                                x, y, z, w, when {
                                    active && numActiveNeighbors in 2..3 -> true
                                    !active && numActiveNeighbors == 3 -> true
                                    else -> false
                                }
                            )
                        }
                    }
                }
            }
            grid.clear()
            grid.putAll(newGrid.grid)
        }

        fun countActive(): Int = grid.values
            .flatMap { it.values }
            .flatMap { it.values }
            .flatMap { it.values }
            .count { it }

        override fun toString(): String {
            val sb = StringBuilder()
            val wKeys = grid.keys.sorted()
            val zKeys = grid.values.flatMap { it.keys }.distinct().sorted()
            val yKeys = grid.values.flatMap { it.values }.flatMap { it.keys }.distinct().sorted()
            val xKeys = grid.values.flatMap { it.values }.flatMap { it.values }.flatMap { it.keys }.distinct().sorted()
            wKeys.forEach { w ->
                zKeys.forEach { z ->
                    sb.append("z=$z, w=$w\n")
                    yKeys.forEach { y ->
                        xKeys.forEach { x ->
                            sb.append(if (get(x, y, z, w)) '#' else '.')
                        }
                        sb.append("\n")
                    }
                    sb.append("\n")
                }
            }
            return sb.toString()
        }
    }

    fun part2(input: String): Int = parse(input)
        .let { initialState ->
            val grid = Grid4D()
            initialState.forEachIndexed { y, row ->
                row.forEachIndexed { x, value ->
                    grid.set(x, y, 0, 0, value)
                }
            }
            repeat(6) { grid.step() }
            grid.countActive()
        }
}

fun main() {
    val day = Day17()
    val input = readText("day17.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")

    val startPart2 = System.currentTimeMillis()
    val answerPart2 = day.part2(input)
    val endPart2 = System.currentTimeMillis()
    println("Part 2: $answerPart2 (${endPart2 - startPart2} ms)")
}
