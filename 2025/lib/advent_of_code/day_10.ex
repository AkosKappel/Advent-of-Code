defmodule AdventOfCode.Day10 do
  defp parse(input) do
    input
    |> String.trim()
    |> String.split("\n", trim: true)
    |> Enum.map(fn line ->
      # Capture: [lights], (buttons), and {joltages}
      ~r/\[([.#]+)\]\s+(.*?)\s+\{([\d,]+)\}/
      |> Regex.run(line)
      |> case do
        [_line, lights, wirings, joltages] ->
          # Convert lights to bitmask
          lights_bitmask =
            lights
            |> String.graphemes()
            |> Enum.with_index()
            |> Enum.map(fn {char, idx} ->
              if char == "#", do: trunc(:math.pow(2, idx)), else: 0
            end)
            |> Enum.sum()

          # Parse button schemas
          wirings =
            wirings
            |> String.split(~r/\)\s*\(/, trim: true)
            |> Enum.map(fn wiring ->
              wiring
              |> String.replace(~r/[()]/, "")
              |> String.split(",")
              |> Enum.map(&String.to_integer/1)
            end)

          # Parse joltages
          joltages =
            joltages
            |> String.split(",")
            |> Enum.map(&String.to_integer/1)

          {lights_bitmask, wirings, joltages}
      end
    end)
  end

  defp index_to_bitmask(indices) do
    indices
    |> Enum.map(&trunc(:math.pow(2, &1)))
    |> Enum.sum()
  end

  defp bfs(target_lights, schema_bitmasks) do
    # Start with state 0 (all lights off)
    initial_state = 0
    queue = :queue.from_list([{initial_state, 0}])
    visited = MapSet.new([initial_state])

    bfs(queue, visited, target_lights, schema_bitmasks)
  end

  defp bfs(queue, visited, target_lights, schema_bitmasks) do
    case :queue.out(queue) do
      {:empty, _} ->
        # Should not happen with valid input
        :infinity

      {{:value, {current_state, steps}}, new_queue} ->
        if current_state == target_lights do
          steps
        else
          # Try pressing each button
          {new_queue, new_visited} =
            Enum.reduce(schema_bitmasks, {new_queue, visited}, fn schema, {q, v} ->
              # XOR to toggle the lights affected by this button
              next_state = Bitwise.bxor(current_state, schema)

              if MapSet.member?(v, next_state) do
                {q, v}
              else
                {
                  :queue.in({next_state, steps + 1}, q),
                  MapSet.put(v, next_state)
                }
              end
            end)

          bfs(new_queue, new_visited, target_lights, schema_bitmasks)
        end
    end
  end

  defp solve_machine({target_lights, schemas, _joltages}) do
    # Convert schemas to bitmasks
    schema_bitmasks = Enum.map(schemas, &index_to_bitmask/1)

    # BFS to find minimum steps
    bfs(target_lights, schema_bitmasks)
  end

  def part1(input) do
    input
    |> parse()
    |> Enum.map(&solve_machine/1)
    |> Enum.sum()
  end

  def part2(_input) do
    nil
  end
end
