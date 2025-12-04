defmodule AdventOfCode.Day04Test do
  use ExUnit.Case

  import AdventOfCode.Day04

  @day 4
  @year 2025

  @example1 String.trim("""
            ..@@.@@@@.
            @@@.@.@.@@
            @@@@@.@.@@
            @.@@@@..@.
            @@.@@@@.@@
            .@@@@@@@.@
            .@.@.@.@@@
            @.@@@.@@@@
            .@@@@@@@@.
            @.@.@@@.@.
            """)

  test "part1 example1" do
    result = part1(@example1)

    assert result == 13
  end

  test "part1" do
    input = AdventOfCode.Input.get!(@day, @year)
    result = part1(input)

    assert result == 1346
  end

  test "part2 example1" do
    result = part2(@example1)

    assert result == 43
  end

  test "part2" do
    input = AdventOfCode.Input.get!(@day, @year)
    result = part2(input)

    assert result == 8493
  end
end
