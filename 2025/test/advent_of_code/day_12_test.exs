defmodule AdventOfCode.Day12Test do
  use ExUnit.Case

  import AdventOfCode.Day12

  @day 12
  @year 2025

  @example String.trim("""
           0:
           ###
           ##.
           ##.

           1:
           ###
           ##.
           .##

           2:
           .##
           ###
           ##.

           3:
           ##.
           ###
           ##.

           4:
           ###
           #..
           ###

           5:
           ###
           .#.
           ###

           4x4: 0 0 0 0 2 0
           12x5: 1 0 1 0 2 2
           12x5: 1 0 1 0 3 2
           """)

  test "part1 example" do
    result = part1(@example)

    assert result == 1 # 2
  end

  test "part1" do
    input = AdventOfCode.Input.get!(@day, @year)
    result = part1(input)

    assert result == 460
  end
end
