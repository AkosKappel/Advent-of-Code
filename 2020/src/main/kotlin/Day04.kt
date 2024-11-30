class Day04 {

    data class Passport(val str: String) {
        private val byr: String? by lazy { str.extract("byr") }
        private val iyr: String? by lazy { str.extract("iyr") }
        private val eyr: String? by lazy { str.extract("eyr") }
        private val hgt: String? by lazy { str.extract("hgt") }
        private val hcl: String? by lazy { str.extract("hcl") }
        private val ecl: String? by lazy { str.extract("ecl") }
        private val pid: String? by lazy { str.extract("pid") }
        private val cid: String? by lazy { str.extract("cid") }

        fun isValid(): Boolean = listOf(byr, iyr, eyr, hgt, hcl, ecl, pid).all { it != null }

        fun isValidStrict(): Boolean = isValid() &&
                byr?.toInt() in 1920..2002 &&
                iyr?.toInt() in 2010..2020 &&
                eyr?.toInt() in 2020..2030 &&
                hgt?.let { hgt ->
                    val regex = """(\d+)(cm|in)""".toRegex()
                    val (value, unit) = regex.find(hgt)?.destructured ?: return@let false
                    when (unit) {
                        "cm" -> value.toInt() in 150..193
                        "in" -> value.toInt() in 59..76
                        else -> false
                    }
                } ?: false &&
                hcl?.matches("""#[0-9a-f]{6}""".toRegex()) ?: false &&
                ecl in listOf("amb", "blu", "brn", "gry", "grn", "hzl", "oth") &&
                pid?.matches("""\d{9}""".toRegex()) ?: false

        private fun String.extract(key: String): String? {
            val regex = """$key:(\S+)""".toRegex()
            return regex.find(this)?.groupValues?.get(1)
        }

        override fun toString(): String {
            return "Passport(byr=$byr, iyr=$iyr, eyr=$eyr, hgt=$hgt, hcl=$hcl, ecl=$ecl, pid=$pid, cid=$cid)"
        }
    }

    private fun parse(input: String): List<Passport> = input
        .split("""\s{3,}""".toRegex())
        .map { it.replace("""\s+""".toRegex(), " ") }
        .map { Passport(it) }

    fun part1(input: String): Int = parse(input).count { it.isValid() }

    fun part2(input: String): Int = parse(input).count { it.isValidStrict() }
}

fun main() {
    val day = Day04()
    val input = readText("day04.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")

    val startPart2 = System.currentTimeMillis()
    val answerPart2 = day.part2(input)
    val endPart2 = System.currentTimeMillis()
    println("Part 2: $answerPart2 (${endPart2 - startPart2} ms)")
}
