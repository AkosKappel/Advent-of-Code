defmodule AdventOfCode.Day12 do
  defp parse(input) do
    chunks = Regex.split(~r/\n\s*\n/, input, trim: true)

    shape_sizes =
      chunks
      |> Enum.drop(-1)
      |> Enum.with_index()
      |> Enum.map(fn {shape, index} -> {index, String.count(shape, "#")} end)
      |> Map.new()

    regions =
      chunks
      |> Enum.at(-1)
      |> String.split("\n", trim: true)
      |> Enum.map(&String.trim/1)
      |> Enum.map(fn line ->
        [area, counts] = String.split(line, ": ")

        counts = counts |> String.split(" ") |> Enum.map(&String.to_integer/1)
        [w, h] = area |> String.split("x") |> Enum.map(&String.to_integer/1)

        {w, h, counts}
      end)

    {shape_sizes, regions}
  end

  def part1(input) do
    {sizes, regions} = parse(input)

    regions
    |> Enum.filter(fn {width, height, counts} ->
      min_needed_area =
        counts
        |> Enum.with_index()
        |> Enum.reduce(0, fn {count, index}, acc -> acc + count * sizes[index] end)

      available_area = width * height
      max_covered_area = 9 * Enum.reduce(counts, 0, &(&1 + &2))

      available_area >= min_needed_area && available_area >= max_covered_area
    end)
    |> Enum.count()
  end
end
