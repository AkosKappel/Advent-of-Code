defmodule AdventOfCode.Day05 do
  defp parse(input) do
    [ranges, ids] = Regex.split(~r/\n\s*\n/, input, trim: true)

    ranges =
      ranges
      |> String.split("\n", trim: true)
      |> Enum.map(&String.trim/1)
      |> Enum.map(fn range ->
        range
        |> String.split("-")
        |> Enum.map(&String.to_integer/1)
        |> List.to_tuple()
      end)

    ids =
      ids
      |> String.split("\n", trim: true)
      |> Enum.map(&String.trim/1)
      |> Enum.map(&String.to_integer/1)

    {ranges, ids}
  end

  defp in_range?(range, id), do: elem(range, 0) <= id && id <= elem(range, 1)

  def part1(input) do
    {ranges, ids} = parse(input)

    ids
    |> Enum.filter(fn id ->
      Enum.any?(ranges, fn range -> in_range?(range, id) end)
    end)
    |> Enum.count()
  end

  def part2(input) do
    {ranges, _ids} = parse(input)

    ranges
    |> merge()
    |> size()
  end

  defp merge(ranges) do
    ranges
    |> Enum.sort_by(fn {s, _e} -> s end)
    |> Enum.reduce([], fn {s, e}, acc ->
      case acc do
        [] ->
          [{s, e}]

        [{prev_s, prev_e} | rest] ->
          if s <= prev_e + 1 do
            # Overlaps
            [{prev_s, max(prev_e, e)} | rest]
          else
            # No overlap
            [{s, e} | acc]
          end
      end
    end)
    |> Enum.reverse()
  end

  defp size(ranges) do
    Enum.reduce(ranges, 0, fn {s, e}, acc ->
      acc + (e - s + 1)
    end)
  end
end
