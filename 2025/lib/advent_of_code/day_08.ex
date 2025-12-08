defmodule AdventOfCode.Day08 do
  defp parse(input) do
    input
    |> String.trim()
    |> String.split("\n", trim: true)
    |> Enum.map(fn line ->
      line
      |> String.trim()
      |> String.split(",", trim: true)
      |> Enum.map(&String.to_integer/1)
    end)
  end

  defp euclidean_distance(point1, point2) do
    point1
    |> Enum.zip(point2)
    |> Enum.map(fn {a, b} -> (a - b) * (a - b) end)
    |> Enum.sum()
    |> :math.sqrt()
  end

  defp build_distance_heap(grid) do
    for i <- 0..(length(grid) - 2),
        j <- (i + 1)..(length(grid) - 1) do
      {euclidean_distance(Enum.at(grid, i), Enum.at(grid, j)), i, j}
    end
    |> Enum.sort()
  end

  defp connect_boxes(distance_heap, n) do
    distance_heap
    |> Enum.take(n)
    |> Enum.reduce([], fn {_dist, i, j}, chains -> merge_chains(chains, i, j) end)
  end

  defp merge_chains(chains, i, j) do
    new_group = MapSet.new([i, j])

    {to_merge, to_keep} =
      Enum.split_with(chains, fn chain ->
        not MapSet.disjoint?(new_group, chain)
      end)

    merged_group =
      Enum.reduce(to_merge, new_group, fn chain, acc ->
        MapSet.union(acc, chain)
      end)

    [merged_group | to_keep]
  end

  def part1(input, num_connections) do
    boxes = parse(input)

    distances = build_distance_heap(boxes)
    chains = connect_boxes(distances, num_connections)

    chains
    |> Enum.map(&MapSet.size/1)
    |> Enum.sort(:desc)
    |> Enum.take(3)
    |> Enum.reduce(1, &(&1 * &2))
  end

  def part2(_input), do: :not_implemented
end
