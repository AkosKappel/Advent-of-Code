defmodule AdventOfCode.Day02 do
  defp parse(input) do
    input
    |> String.trim()
    |> String.split(",")
    |> Enum.map(fn pair ->
      [from, to] = String.split(pair, "-")
      {String.to_integer(from), String.to_integer(to)}
    end)
  end

  defp is_repeating_twice(id) do
    digits = Integer.digits(id)
    len = length(digits)

    if rem(len, 2) != 0 do
      # Odd number of digits can't be repeating
      false
    else
      half = div(len, 2)
      {first, second} = Enum.split(digits, half)
      first == second
    end
  end

  def part1(args) do
    args
    |> parse()
    |> Enum.reduce(0, fn {from, to}, count ->
      from..to
      |> Enum.filter(&is_repeating_twice/1)
      |> Enum.reduce(count, fn id, acc -> acc + id end)
    end)
  end

  defp is_repeating_any_times(id) do
    digits = Integer.digits(id)
    len = length(digits)

    # A pattern must repeat at least twice, so we need at least 2 digits
    # and the pattern length must be at most len/2
    if len < 2 do
      false
    else
      Enum.any?(1..div(len, 2), fn pattern_len ->
        if rem(len, pattern_len) == 0 do
          chunks = Enum.chunk_every(digits, pattern_len)
          first_chunk = hd(chunks)
          # Check if we have at least 2 chunks and all are the same
          length(chunks) >= 2 and Enum.all?(chunks, &(&1 == first_chunk))
        else
          false
        end
      end)
    end
  end

  def part2(args) do
    args
    |> parse()
    |> Enum.reduce(0, fn {from, to}, count ->
      from..to
      |> Enum.filter(&is_repeating_any_times/1)
      |> Enum.reduce(count, fn id, acc -> acc + id end)
    end)
  end
end
