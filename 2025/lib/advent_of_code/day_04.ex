defmodule AdventOfCode.Day04 do
  defp parse(input) do
    input
    |> String.split("\n", trim: true)
    |> Enum.map(&String.graphemes/1)
  end

  def part1(input) do
    grid = parse(input)
    h = length(grid)
    w = grid |> hd() |> length()

    for y <- 0..(h - 1),
        x <- 0..(w - 1),
        accessible?(grid, x, y),
        reduce: 0 do
      acc -> acc + 1
    end
  end

  def part2(input) do
    grid = parse(input)
    {count, _final_grid} = peel(grid, 0)
    count
  end

  defp peel(grid, removed_total) do
    h = length(grid)
    w = length(hd(grid))

    accessible =
      for y <- 0..(h - 1),
          x <- 0..(w - 1),
          accessible?(grid, x, y),
          do: {x, y}

    case accessible do
      [] ->
        {removed_total, grid}

      cells ->
        new_grid = remove_cells(grid, cells)
        peel(new_grid, removed_total + length(cells))
    end
  end

  defp remove_cells(grid, cells) do
    to_remove = MapSet.new(cells)

    for {row, y} <- Enum.with_index(grid) do
      for {v, x} <- Enum.with_index(row) do
        if MapSet.member?(to_remove, {x, y}), do: ".", else: v
      end
    end
  end

  defp accessible?(grid, x, y) do
    case get(grid, x, y) do
      "@" ->
        neighbors(x, y)
        |> Enum.count(fn {nx, ny} -> get(grid, nx, ny) == "@" end)
        |> then(&(&1 < 4))

      _ ->
        false
    end
  end

  defp neighbors(x, y) do
    for dx <- -1..1,
        dy <- -1..1,
        not (dx == 0 and dy == 0) do
      {x + dx, y + dy}
    end
  end

  defp get(grid, x, y) do
    cond do
      y < 0 or y >= length(grid) -> nil
      x < 0 or x >= length(Enum.at(grid, y)) -> nil
      true -> grid |> Enum.at(y) |> Enum.at(x)
    end
  end
end
