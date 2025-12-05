defmodule AdventOfCode.Day01 do
  @initial_dial 50
  @min_value 0
  @max_value 99
  @range_size @max_value - @min_value + 1

  defp parse(input) do
    input
    |> String.split("\n", trim: true)
    |> Enum.map(fn <<dir::binary-size(1), dist::binary>> ->
      dist = dist |> String.trim() |> String.to_integer()

      case dir do
        "L" -> {:left, dist}
        "R" -> {:right, dist}
      end
    end)
  end

  defp turn(:left, dial, steps),
    do: ((dial - steps - @min_value) |> Integer.mod(@range_size)) + @min_value

  defp turn(:right, dial, steps),
    do: ((dial + steps - @min_value) |> Integer.mod(@range_size)) + @min_value

  defp zero_hit(0), do: 1
  defp zero_hit(_), do: 0

  @spec part1(String.t()) :: integer()
  def part1(input) do
    rotations = parse(input)

    {_final_dial, num_zeros} =
      Enum.reduce(rotations, {@initial_dial, 0}, fn {direction, steps}, {dial, hits} ->
        new_dial = turn(direction, dial, steps)
        {new_dial, hits + zero_hit(new_dial)}
      end)

    num_zeros
  end

  defp zero_passes(direction, dial, steps) do
    first_zero_distance =
      case direction do
        :left -> dial |> rem(@range_size)
        :right -> (@range_size - dial) |> rem(@range_size)
      end

    first_zero_distance = if first_zero_distance == 0, do: @range_size, else: first_zero_distance

    if steps >= first_zero_distance do
      1 + div(steps - first_zero_distance, @range_size)
    else
      0
    end
  end

  @spec part2(String.t()) :: integer()
  def part2(input) do
    rotations = parse(input)

    {_final_dial, num_passes} =
      Enum.reduce(rotations, {@initial_dial, 0}, fn {direction, steps}, {dial, passes} ->
        new_dial = turn(direction, dial, steps)
        {new_dial, passes + zero_passes(direction, dial, steps)}
      end)

    num_passes
  end
end
