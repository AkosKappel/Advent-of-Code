defmodule AdventOfCode.Day09 do
  defp parse(input) do
    input
    |> String.trim()
    |> String.split("\n", trim: true)
    |> Enum.map(fn line ->
      line
      |> String.trim()
      |> String.split(",", trim: true)
      |> Enum.map(&String.to_integer/1)
      |> List.to_tuple()
    end)
    |> Enum.to_list()
  end

  defp area(p1, p2) do
    {x1, y1} = p1
    {x2, y2} = p2

    width = abs(x1 - x2) + 1
    height = abs(y1 - y2) + 1
    width * height
  end

  defp find_largest_area(points) do
    points
    |> Enum.with_index()
    |> Enum.flat_map(fn {corner1, i} ->
      points
      |> Enum.drop(i + 1)
      |> Enum.map(fn corner2 -> area(corner1, corner2) end)
    end)
    |> Enum.max()
  end

  def part1(input) do
    input
    |> parse()
    |> find_largest_area()
  end

  # Coordinate compression
  # collect all unique x and y coordinates from the polygon
  # and add x+1 and y+1 to capture the grid cells between coordinates
  defp build_compressed_coordinates(points) do
    {x_coords, y_coords} =
      Enum.reduce(points, {MapSet.new(), MapSet.new()}, fn {x, y}, {xs, ys} ->
        xs = xs |> MapSet.put(x) |> MapSet.put(x + 1)
        ys = ys |> MapSet.put(y) |> MapSet.put(y + 1)
        {xs, ys}
      end)

    x_list = x_coords |> MapSet.to_list() |> Enum.sort()
    y_list = y_coords |> MapSet.to_list() |> Enum.sort()

    x_index_map = x_list |> Enum.with_index() |> Map.new(fn {x, i} -> {x, i} end)
    y_index_map = y_list |> Enum.with_index() |> Map.new(fn {y, i} -> {y, i} end)

    {x_list, y_list, x_index_map, y_index_map}
  end

  # Build a grid marking polygon edges using bit flags
  # Flag 1 = left edge, Flag 2 = right edge, Flag 3 = horizontal segment
  defp build_edge_grid(points, x_list, y_list, x_index_map, y_index_map) do
    edge_grid = for _ <- x_list, do: for(_ <- y_list, do: 0)

    shifted_points = tl(points ++ [hd(points)])

    points
    |> Enum.zip(shifted_points)
    |> Enum.reduce(edge_grid, fn {{x1, y1}, {x2, y2}}, grid ->
      x_idx1 = x_index_map[x1]
      x_idx2 = x_index_map[x2]
      y_idx1 = y_index_map[y1]
      _y_idx2 = y_index_map[y2]

      cond do
        # Horizontal edge
        x_idx1 != x_idx2 ->
          {x_start, x_end} = if x_idx1 > x_idx2, do: {x_idx2, x_idx1}, else: {x_idx1, x_idx2}

          # Mark left edge
          grid =
            List.update_at(grid, x_start, fn row ->
              List.update_at(row, y_idx1, &Bitwise.bor(&1, 1))
            end)

          # Mark right edge
          grid =
            List.update_at(grid, x_end, fn row ->
              List.update_at(row, y_idx1, &Bitwise.bor(&1, 2))
            end)

          # Mark middle segments
          Enum.reduce((x_start + 1)..(x_end - 1), grid, fn x, acc ->
            List.update_at(acc, x, fn row ->
              List.update_at(row, y_idx1, &Bitwise.bor(&1, 3))
            end)
          end)

        # Vertical edge (handled implicitly by scanning)
        true ->
          grid
      end
    end)
  end

  # Determine which cells are inside the polygon using scanline fill
  # Uses XOR of edge flags to track inside/outside transitions
  defp build_inside_grid(edge_grid) do
    Enum.map(edge_grid, fn row ->
      {inside_flags, _} =
        Enum.map_reduce(row, 0, fn cell, inside_state ->
          is_inside = inside_state > 0 or cell > 0
          new_state = Bitwise.bxor(inside_state, cell)
          {is_inside, new_state}
        end)

      inside_flags
    end)
  end

  # Build 2D prefix sum array for fast rectangle sum queries
  defp build_prefix_sum_grid(inside_grid, x_list, y_list) do
    prefix_sums = for _ <- 0..length(x_list), do: for(_ <- 0..length(y_list), do: 0)

    Enum.reduce(0..(length(inside_grid) - 1), prefix_sums, fn i, sums ->
      row = Enum.at(inside_grid, i)

      Enum.reduce(0..(length(row) - 1), sums, fn j, acc ->
        cell_value = if Enum.at(row, j), do: 1, else: 0
        sum = cell_value + get_cell(acc, i, j + 1) + get_cell(acc, i + 1, j) - get_cell(acc, i, j)
        set_cell(acc, i + 1, j + 1, sum)
      end)
    end)
  end

  defp get_cell(grid, row, col), do: grid |> Enum.at(row) |> Enum.at(col)

  defp set_cell(grid, row, col, value) do
    List.update_at(grid, row, fn r ->
      List.update_at(r, col, fn _ -> value end)
    end)
  end

  # Find the largest axis-aligned rectangle that fits entirely inside the polygon
  defp find_largest_interior_rectangle(points, x_index_map, y_index_map, prefix_sums) do
    points
    |> Enum.with_index()
    |> Enum.flat_map(fn {{x1, y1}, i} ->
      points
      |> Enum.take(i)
      |> Enum.map(fn {x2, y2} ->
        {x_min, x_max} = if x1 > x2, do: {x2, x1}, else: {x1, x2}
        {y_min, y_max} = if y1 > y2, do: {y2, y1}, else: {y1, y2}

        x_idx_min = x_index_map[x_min]
        x_idx_max = x_index_map[x_max]
        y_idx_min = y_index_map[y_min]
        y_idx_max = y_index_map[y_max]

        # Use prefix sums to count cells inside polygon within rectangle
        cells_inside =
          get_cell(prefix_sums, x_idx_max + 1, y_idx_max + 1) -
            get_cell(prefix_sums, x_idx_max + 1, y_idx_min) -
            get_cell(prefix_sums, x_idx_min, y_idx_max + 1) +
            get_cell(prefix_sums, x_idx_min, y_idx_min)

        total_cells = (x_idx_max - x_idx_min + 1) * (y_idx_max - y_idx_min + 1)

        # Rectangle fits entirely inside if all cells are inside the polygon
        if cells_inside == total_cells do
          (x_max - x_min + 1) * (y_max - y_min + 1)
        else
          0
        end
      end)
    end)
    |> Enum.max()
  end

  def part2(input) do
    tiles = parse(input)

    {x_list, y_list, x_index_map, y_index_map} = build_compressed_coordinates(tiles)
    edge_grid = build_edge_grid(tiles, x_list, y_list, x_index_map, y_index_map)
    inside_grid = build_inside_grid(edge_grid)
    prefix_sums = build_prefix_sum_grid(inside_grid, x_list, y_list)

    find_largest_interior_rectangle(tiles, x_index_map, y_index_map, prefix_sums)
  end
end
