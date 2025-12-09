defmodule AdventOfCode.Day09 do
  defp parse(input) do
    input
    |> String.trim()
    |> String.split("\n", trim: true)
    |> Enum.map(fn line ->
      line
      |> String.trim()
      |> String.split(",", trim: true)
      |> Enum.map(&String.to_integer/1)
      |> List.to_tuple()
    end)
    |> Enum.to_list()
  end

  defp area(p1, p2) do
    {x1, y1} = p1
    {x2, y2} = p2

    width = abs(x1 - x2) + 1
    height = abs(y1 - y2) + 1
    width * height
  end

  defp find_largest_area(tiles) do
    tiles
    |> Enum.with_index()
    |> Enum.flat_map(fn {p1, i} ->
      tiles
      |> Enum.drop(i + 1)
      |> Enum.map(fn p2 -> area(p1, p2) end)
    end)
    |> Enum.max()
  end

  def part1(input) do
    input
    |> parse()
    |> find_largest_area()
  end

  def part2(_input) do
    0
  end
end
