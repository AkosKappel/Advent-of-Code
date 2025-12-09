defmodule AdventOfCode.Day05Test do
  use ExUnit.Case

  import AdventOfCode.Day05

  @day 5
  @year 2025

  @example String.trim("""
           3-5
           10-14
           16-20
           12-18

           1
           5
           8
           11
           17
           32
           """)

  test "part1 example" do
    result = part1(@example)

    assert result == 3
  end

  test "part1" do
    input = AdventOfCode.Input.get!(@day, @year)
    result = part1(input)

    assert result == 652
  end

  test "part2 example" do
    result = part2(@example)

    assert result == 14
  end

  test "part2" do
    input = AdventOfCode.Input.get!(@day, @year)
    result = part2(input)

    assert result == 341_753_674_214_273
  end
end
