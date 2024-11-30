import java.math.BigInteger
import java.security.MessageDigest
import kotlin.io.path.Path
import kotlin.io.path.readLines
import kotlin.io.path.readText
import kotlin.system.measureTimeMillis

/**
 * Reads text from the given input file located in resources.
 */
fun readText(name: String) = Path("src/main/resources/$name").readText()
fun readLines(name: String) = Path("src/main/resources/$name").readLines()

/**
 * Converts string to md5 hash.
 */
fun String.md5() = BigInteger(1, MessageDigest.getInstance("MD5").digest(toByteArray()))
    .toString(16)
    .padStart(32, '0')

/**
 * The cleaner shorthand for printing output.
 */
fun Any?.println() = println(this)

/**
 * Measures execution time of the given code block.
 */
fun measureExecutionTime(block: () -> Unit): Long {
    val executionTime = measureTimeMillis {
        block()
    }
    println("Execution time: $executionTime ms")
    return executionTime
}
