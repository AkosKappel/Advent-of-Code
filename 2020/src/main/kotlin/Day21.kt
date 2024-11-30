class Day21 {

    data class Food(val ingredients: Set<String>, val allergens: Set<String>)

    private fun parse(input: String): List<Food> = input.lines()
        .map { line ->
            val (ingredients, allergens) = line.split(" (contains ")
            Food(ingredients.split(" ").toSet(), allergens.dropLast(1).split(", ").toSet())
        }

    private fun matchPossibleAllergens(foods: List<Food>): MutableMap<String, MutableSet<String>> {
        val allergenToIngredients = mutableMapOf<String, MutableSet<String>>()
        foods.forEach { food ->
            food.allergens.forEach { allergen ->
                allergenToIngredients.getOrPut(allergen) { food.ingredients.toMutableSet() }
                    .retainAll(food.ingredients)
            }
        }
        return allergenToIngredients
    }

    fun part1(input: String): Int = parse(input).let { foods ->
        val allergenToIngredients = matchPossibleAllergens(foods)
        val ingredientsWithAllergens = allergenToIngredients.values.flatten().toSet()
        foods.sumOf { food ->
            food.ingredients.count { it !in ingredientsWithAllergens }
        }
    }

    fun part2(input: String): String = parse(input).let { foods ->
        val allergenToIngredients = matchPossibleAllergens(foods)
        val allergenToIngredient = mutableMapOf<String, String>()
        while (allergenToIngredients.isNotEmpty()) {
            val (allergen, ingredients) = allergenToIngredients.entries.first { it.value.size == 1 }
            val ingredient = ingredients.first()
            allergenToIngredient[allergen] = ingredient
            allergenToIngredients.remove(allergen)
            allergenToIngredients.values.forEach { it.remove(ingredient) }
        }
        allergenToIngredient.entries.sortedBy { it.key }.joinToString(",") { it.value }
    }
}

fun main() {
    val day = Day21()
    val input = readText("day21.txt")

    val startPart1 = System.currentTimeMillis()
    val answerPart1 = day.part1(input)
    val endPart1 = System.currentTimeMillis()
    println("Part 1: $answerPart1 (${endPart1 - startPart1} ms)")

    val startPart2 = System.currentTimeMillis()
    val answerPart2 = day.part2(input)
    val endPart2 = System.currentTimeMillis()
    println("Part 2: $answerPart2 (${endPart2 - startPart2} ms)")
}
