defmodule AdventOfCode.Day12 do
  defp parse(input) do
    Regex.split(~r/\n\s*\n/, input, trim: true)
    |> Enum.at(-1)
    |> String.split("\n", trim: true)
    |> Enum.map(&String.trim/1)
    |> Enum.map(fn line ->
      [area, shapes] = String.split(line, ": ")

      shapes = shapes |> String.split(" ") |> Enum.map(&String.to_integer/1)
      [w, h] = area |> String.split("x") |> Enum.map(&String.to_integer/1)

      {w, h, shapes}
    end)
  end

  def part1(input) do
    input
    |> parse()
    |> Enum.filter(fn {width, height, shapes} ->
      area = Enum.reduce(shapes, 0, fn v, acc -> acc + 9 * v end)
      width * height >= area
    end)
    |> Enum.count()
  end
end
