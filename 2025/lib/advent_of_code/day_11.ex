defmodule AdventOfCode.Day11 do
  defp parse(input) do
    input
    |> String.trim()
    |> String.split("\n", trim: true)
    |> Enum.map(&String.trim/1)
    |> Enum.map(fn line ->
      [source, destionations] = String.split(line, ": ")
      {source, String.split(destionations, " ")}
    end)
    |> Enum.into(%{})
  end

  defp count_paths(_graph, nil, _target, _visited), do: 0
  defp count_paths(_graph, start, target, _visited) when start == target, do: 1

  defp count_paths(graph, start, target, visited) do
    neighbors = Map.get(graph, start, [])

    {total, _final_visited} =
      Enum.reduce(neighbors, {0, visited}, fn next_label, {sum, visit_map} ->
        cond do
          # Direct connection to target
          next_label == target ->
            {sum + 1, visit_map}

          # Already computed for this node
          Map.has_key?(visit_map, next_label) ->
            {sum + Map.get(visit_map, next_label), visit_map}

          # Recursively compute
          true ->
            value = count_paths(graph, next_label, target, visit_map)
            new_visit_map = Map.put(visit_map, next_label, value)
            {sum + value, new_visit_map}
        end
      end)

    total
  end

  def part1(input) do
    input
    |> parse()
    |> count_paths("you", "out", %{})
  end

  def part2(_input) do
  end
end
