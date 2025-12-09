defmodule AdventOfCode.Day07Test do
  use ExUnit.Case

  import AdventOfCode.Day07

  @day 7
  @year 2025

  @example String.trim("""
           .......S.......
           ...............
           .......^.......
           ...............
           ......^.^......
           ...............
           .....^.^.^.....
           ...............
           ....^.^...^....
           ...............
           ...^.^...^.^...
           ...............
           ..^...^.....^..
           ...............
           .^.^.^.^.^...^.
           ...............
           """)

  test "part1 example" do
    result = part1(@example)

    assert result == 21
  end

  test "part1" do
    input = AdventOfCode.Input.get!(@day, @year)
    result = part1(input)

    assert result == 1490
  end

  test "part2 example" do
    result = part2(@example)

    assert result == 40
  end

  test "part2" do
    input = AdventOfCode.Input.get!(@day, @year)
    result = part2(input)

    assert result == 3_806_264_447_357
  end
end
