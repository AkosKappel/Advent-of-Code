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

  defp solve_joltage({_lights_bitmask, buttons, jolts}) do
    num_buttons = length(buttons)
    num_counters = length(jolts)

    # Generate all possible button press combinations and their effects
    {ops, patterns} =
      generate_combinations(num_buttons)
      |> Enum.reduce({%{}, %{}}, fn pressed, {ops_acc, patterns_acc} ->
        # Calculate jolt values for this combination
        jolt = List.duplicate(0, num_counters)
        jolt =
          pressed
          |> Enum.with_index()
          |> Enum.reduce(jolt, fn {p, i}, acc ->
            if p == 1 do
              button = Enum.at(buttons, i)
              Enum.reduce(button, acc, fn j, a ->
                List.update_at(a, j, &(&1 + p))
              end)
            else
              acc
            end
          end)

        jolt_tuple = List.to_tuple(jolt)

        # Light pattern (mod 2 for matching)
        lights = jolt |> Enum.map(&rem(&1, 2)) |> List.to_tuple()
        pressed_tuple = List.to_tuple(pressed)

        new_ops = Map.put(ops_acc, pressed_tuple, jolt_tuple)
        new_patterns = Map.update(patterns_acc, lights, [pressed_tuple], &[pressed_tuple | &1])

        {new_ops, new_patterns}
      end)

    # Use memoized recursion to find minimum presses
    jolts_tuple = List.to_tuple(jolts)
    {result, _cache} = find_min_presses(jolts_tuple, ops, patterns, %{})

    case result do
      :infinity -> 0
      val -> val
    end
  end

  defp find_min_presses(target, ops, patterns, cache) do
    # Check cache
    if Map.has_key?(cache, target) do
      {Map.get(cache, target), cache}
    else
      target_list = Tuple.to_list(target)

      # Base case: all zeros
      if Enum.all?(target_list, &(&1 == 0)) do
        {0, Map.put(cache, target, 0)}
      # Invalid: any negative value
      else if Enum.any?(target_list, &(&1 < 0)) do
        {:infinity, Map.put(cache, target, :infinity)}
      else
        # Calculate light pattern (mod 2)
        lights = Enum.map(target_list, &rem(&1, 2)) |> List.to_tuple()

        # Try all button combinations that produce this light pattern
        pressed_options = Map.get(patterns, lights, [])

        {min_result, final_cache} =
          Enum.reduce(pressed_options, {:infinity, cache}, fn pressed, {current_min, current_cache} ->
            diff = Map.get(ops, pressed)

            # Calculate new target
            new_target =
              target_list
              |> Enum.zip(Tuple.to_list(diff))
              |> Enum.map(fn {b, a} -> div(b - a, 2) end)
              |> List.to_tuple()

            # Recursive call
            {sub_result, new_cache} = find_min_presses(new_target, ops, patterns, current_cache)

            presses = Tuple.to_list(pressed) |> Enum.sum()
            total = case sub_result do
              :infinity -> :infinity
              val -> presses + 2 * val
            end

            new_min = min_value(current_min, total)
            {new_min, new_cache}
          end)

        {min_result, Map.put(final_cache, target, min_result)}
      end
      end
    end
  end

  def part2(input) do
    input
    |> parse()
    |> Enum.map(&solve_joltage/1)
    |> Enum.sum()
  end

  defp generate_combinations(n), do: combinations(n, [])

  defp combinations(0, acc), do: [Enum.reverse(acc)]
  defp combinations(n, acc), do: combinations(n - 1, [0 | acc]) ++ combinations(n - 1, [1 | acc])

  defp min_value(:infinity, :infinity), do: :infinity
  defp min_value(:infinity, b), do: b
  defp min_value(a, :infinity), do: a
  defp min_value(a, b), do: min(a, b)
end
