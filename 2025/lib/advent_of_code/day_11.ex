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

  defp count_paths(graph, nodes_to_visit) when is_list(nodes_to_visit) do
    nodes_to_visit
    |> Enum.chunk_every(2, 1, :discard)
    |> Enum.reduce(1, fn [from, to], product ->
      product * count_paths(graph, from, to)
    end)
  end

  defp count_paths(graph, start, target) do
    {:ok, cache} = Agent.start_link(fn -> %{} end)
    result = count_paths(graph, start, target, MapSet.new(), cache)
    Agent.stop(cache)
    result
  end

  defp count_paths(_graph, start, target, _visited, _cache) when start == target, do: 1

  defp count_paths(graph, start, target, visited, cache) do
    if MapSet.member?(visited, start) do
      # Already in current path (cycle detection)
      0
    else
      cache_key = {start, target}

      case Agent.get(cache, &Map.get(&1, cache_key)) do
        nil ->
          # Not in cache, compute it
          neighbors = Map.get(graph, start, [])
          new_visited = MapSet.put(visited, start)

          result =
            Enum.reduce(neighbors, 0, fn next_label, sum ->
              sum + count_paths(graph, next_label, target, new_visited, cache)
            end)

          # Store in cache
          Agent.update(cache, &Map.put(&1, cache_key, result))
          result

        cached_result ->
          # Return cached result
          cached_result
      end
    end
  end

  def part1(input) do
    input
    |> parse()
    |> count_paths("you", "out")
  end

  def part2(input) do
    devices = parse(input)

    paths1 = count_paths(devices, ["svr", "fft", "dac", "out"])
    paths2 = count_paths(devices, ["svr", "dac", "fft", "out"])

    paths1 + paths2
  end
end
