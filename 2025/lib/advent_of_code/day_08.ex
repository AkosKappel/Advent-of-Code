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

  defp merge(circuits, i, j) do
    new_group = MapSet.new([i, j])

    {to_merge, to_keep} =
      Enum.split_with(circuits, fn circuit ->
        not MapSet.disjoint?(new_group, circuit)
      end)

    merged_group =
      Enum.reduce(to_merge, new_group, fn circuit, acc ->
        MapSet.union(acc, circuit)
      end)

    [merged_group | to_keep]
  end

  defp connect_boxes(distance_heap, n) do
    distance_heap
    |> Enum.take(n)
    |> Enum.reduce([], fn {_distance, i, j}, circuits -> merge(circuits, i, j) end)
  end

  def part1(input, num_connections) do
    boxes = parse(input)
    distances = build_distance_heap(boxes)

    circuits = connect_boxes(distances, num_connections)

    circuits
    |> Enum.map(&MapSet.size/1)
    |> Enum.sort(:desc)
    |> Enum.take(3)
    |> Enum.reduce(1, &(&1 * &2))
  end

  defp connect_all(boxes, distance_heap) do
    Enum.reduce_while(distance_heap, {[], nil}, fn
      {_distance, i, j}, {circuits, _last_connection} ->
        new_circuits = merge(circuits, i, j)

        all_connected? =
          length(new_circuits) == 1 and MapSet.size(hd(new_circuits)) == length(boxes)

        if all_connected? do
          {:halt, {new_circuits, {i, j}}}
        else
          {:cont, {new_circuits, {i, j}}}
        end
    end)
  end

  def part2(input) do
    boxes = parse(input)
    distances = build_distance_heap(boxes)

    {i, j} = connect_all(boxes, distances) |> elem(1)

    box1 = Enum.at(boxes, i)
    box2 = Enum.at(boxes, j)

    hd(box1) * hd(box2)
  end
end
