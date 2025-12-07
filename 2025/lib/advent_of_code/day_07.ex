defmodule AdventOfCode.Day07 do
  defp parse(input) do
    rows =
      input
      |> String.trim()
      |> String.split("\n", trim: true)

    # Find starting point (x, y)
    start =
      rows
      |> Enum.with_index()
      |> Enum.flat_map(fn {row, y} ->
        row
        |> String.graphemes()
        |> Enum.with_index()
        |> Enum.filter(fn {char, _} -> char == "S" end)
        |> Enum.map(fn {_, x} -> {x, y} end)
      end)
      |> List.first()

    # Convert start to initial beam
    beams = MapSet.new([elem(start, 0)])

    # Track positions of all splitters
    splitters =
      rows
      |> Enum.map(fn row ->
        row
        |> String.graphemes()
        |> Enum.with_index()
        |> Enum.filter(fn {char, _} -> char == "^" end)
        |> Enum.map(fn {_, index} -> index end)
      end)
      |> Enum.filter(&(length(&1) > 0))
      |> Enum.map(&MapSet.new/1)

    {beams, splitters}
  end

  def part1(input) do
    {beams, all_splitters} = parse(input)

    Enum.reduce(all_splitters, {beams, 0}, fn splitters, {beams, num_collisions} ->
      colliding_beams = MapSet.intersection(beams, splitters)
      passing_beams = MapSet.difference(beams, splitters)

      split_beams =
        colliding_beams
        |> MapSet.to_list()
        |> Enum.map(fn x -> MapSet.new([x - 1, x + 1]) end)
        |> Enum.reduce(MapSet.new(), &MapSet.union/2)

      {MapSet.union(split_beams, passing_beams), num_collisions + MapSet.size(colliding_beams)}
    end)
    |> elem(1)
  end

  def part2(_input) do
  end
end
