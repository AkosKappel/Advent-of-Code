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
    {initial_beams_set, all_splitters} = parse(input)

    {_final_beams, total_collisions} =
      Enum.reduce(all_splitters, {initial_beams_set, 0}, fn splitters, {beams, num_collisions} ->
        colliding_beams = MapSet.intersection(beams, splitters)
        passing_beams = MapSet.difference(beams, splitters)

        split_beams =
          colliding_beams
          |> MapSet.to_list()
          |> Enum.map(&MapSet.new([&1 - 1, &1 + 1]))
          |> Enum.reduce(MapSet.new(), &MapSet.union/2)

        num_new_collisions = MapSet.size(colliding_beams)
        new_beans = MapSet.union(split_beams, passing_beams)

        {new_beans, num_collisions + num_new_collisions}
      end)

    total_collisions
  end

  def part2(input) do
    {initial_beams_set, all_splitters} = parse(input)

    beams =
      Enum.reduce(initial_beams_set, %{}, fn pos, acc ->
        Map.update(acc, pos, 1, &(&1 + 1))
      end)

    {_final_beams, total_collisions} =
      Enum.reduce(all_splitters, {beams, 0}, fn splitters, {beams, num_collisions} ->
        colliding_beams =
          beams
          |> Enum.filter(fn {pos, _count} -> MapSet.member?(splitters, pos) end)

        passing_beams =
          beams
          |> Enum.reject(fn {pos, _count} -> MapSet.member?(splitters, pos) end)
          |> Enum.reduce(%{}, fn {pos, count}, acc ->
            Map.update(acc, pos, count, &(&1 + count))
          end)

        split_beams =
          Enum.reduce(colliding_beams, %{}, fn {pos, count}, acc ->
            acc
            |> Map.update(pos - 1, count, &(&1 + count))
            |> Map.update(pos + 1, count, &(&1 + count))
          end)

        new_beams =
          Map.merge(passing_beams, split_beams, fn _pos, c1, c2 -> c1 + c2 end)

        num_new_collisions =
          Enum.reduce(colliding_beams, 0, fn {_pos, count}, acc -> acc + count end)

        {new_beams, num_collisions + num_new_collisions}
      end)

    total_collisions + 1
  end
end
