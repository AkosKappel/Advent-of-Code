plugins {
    kotlin("jvm") version "1.9.21"
    application
}

group = "org.xkap"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    testImplementation(kotlin("test"))
}

tasks.test {
    useJUnitPlatform()
}

kotlin {
    jvmToolchain(8)
}

application {
    // ./gradlew run -Pday=5
    val day = (findProperty("day") as String? ?: "1").padStart(2, '0')
    mainClass.set("Day${day}Kt")
}