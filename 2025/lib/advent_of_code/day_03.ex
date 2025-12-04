defmodule AdventOfCode.Day03 do
  defp parse(input) do
    input
    |> String.split("\n", trim: true)
    |> Enum.map(fn line ->
      line
      |> String.trim()
      |> String.graphemes()
      |> Enum.map(&String.to_integer/1)
    end)
  end

  def part1(args) do
    args
    |> parse()
    |> Enum.map(&max_two_digit/1)
    |> Enum.sum()
  end

  defp max_two_digit(digits) do
    for {digit_i, i} <- Enum.with_index(digits),
        {digit_j, j} <- Enum.with_index(digits),
        j > i,
        reduce: 0 do
      acc -> max(acc, 10 * digit_i + digit_j)
    end
  end

  def part2(args) do
    args
    |> parse()
    |> Enum.map(&max_k_digit/1)
    |> Enum.map(&String.to_integer/1)
    |> Enum.sum()
  end

  # Choose lexicographically largest subsequence of length k
  defp max_k_digit(digits, k \\ 12) do
    n = length(digits)

    choose(digits, k, n - k)
    |> Enum.join()
  end

  # Greedy selection:
  # `drop` = how many digits we are allowed to skip in total
  defp choose(digits, k, drop) do
    do_choose(digits, k, drop, [])
  end

  defp do_choose(_, 0, _drop, acc), do: Enum.reverse(acc)

  defp do_choose([_d | _rest] = digits, k, _drop, acc) when length(digits) == k do
    # must take all remaining digits
    Enum.reverse(acc) ++ digits
  end

  defp do_choose([d | rest], k, drop, acc) do
    # find best digit in allowed window
    take_window = drop + 1

    {best, idx} =
      rest
      |> Enum.take(take_window - 1)
      |> List.insert_at(0, d)
      |> Enum.with_index()
      |> Enum.max_by(fn {digit, _i} -> digit end)

    # skip `idx` digits to take best one
    {_skipped, remaining} = Enum.split([d | rest], idx + 1)

    do_choose(remaining, k - 1, drop - idx, [best | acc])
  end
end
