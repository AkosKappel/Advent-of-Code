defmodule AdventOfCode.Day06 do
  defp parse(input) do
    rows =
      input
      |> String.split("\n", trim: true)
      |> Stream.map(&String.split(&1, ~r/\s+/, trim: true))
      |> Enum.to_list()

    operands = List.last(rows)

    rows =
      rows
      |> List.delete_at(-1)
      |> Enum.map(fn row -> Enum.map(row, &String.to_integer/1) end)
      |> Enum.zip()
      |> Enum.map(&Tuple.to_list/1)

    {rows, operands}
  end

  def part1(input) do
    {equations, operands} = parse(input)

    Enum.zip(equations, operands)
    |> Enum.map(fn {equation, operand} ->
      case operand do
        "*" -> Enum.reduce(equation, 1, &(&1 * &2))
        "+" -> Enum.reduce(equation, 0, &(&1 + &2))
      end
    end)
    |> Enum.sum()
  end

  def part2(_input) do
  end
end
