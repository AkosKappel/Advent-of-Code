defmodule AdventOfCode.Day06 do
  defp parse(input) do
    # Keep spaces in the input unchanged
    rows =
      input
      |> String.split("\n")
      |> Enum.map(&String.replace(&1, ~r/[^0-9 +*]/, ""))
      |> Enum.filter(&(String.length(&1) > 0))

    max_length =
      rows
      |> Enum.max_by(&String.length/1)
      |> String.length()

    # Add padding to make all rows the same length
    rows =
      rows
      |> Enum.map(&String.pad_trailing(&1, max_length, " "))

    operands =
      rows
      |> List.last()
      |> String.split(~r/\s+/, trim: true)

    {List.delete_at(rows, -1), operands}
  end

  defp solve(equations, operands) do
    Enum.zip(equations, operands)
    |> Enum.map(fn {equation, operand} ->
      case operand do
        "*" -> Enum.reduce(equation, 1, &(&1 * &2))
        "+" -> Enum.reduce(equation, 0, &(&1 + &2))
      end
    end)
    |> Enum.sum()
  end

  def part1(input) do
    {equations, operands} = parse(input)

    equations =
      equations
      |> Stream.map(&String.split(&1, ~r/\s+/, trim: true))
      |> Enum.map(fn row -> Enum.map(row, &String.to_integer/1) end)
      |> Enum.zip()
      |> Enum.map(&Tuple.to_list/1)

    solve(equations, operands)
  end

  def part2(input) do
    {equations, operands} = parse(input)

    columns =
      equations
      |> Stream.map(&String.graphemes/1)
      |> Enum.zip()
      |> Enum.map(&Tuple.to_list/1)
      |> Enum.reverse()
      |> Enum.map(&Enum.join/1)
      |> Enum.map(&String.trim/1)
      |> Enum.map(fn str ->
        cond do
          str =~ ~r/^\s*$/ ->
            nil

          true ->
            String.to_integer(str)
        end
      end)

    equations =
      columns
      |> Enum.chunk_by(&is_nil/1)
      |> Enum.filter(&(&1 != [nil]))

    solve(equations, Enum.reverse(operands))
  end
end
