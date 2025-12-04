defmodule AdventOfCode.Day11Test do
  use ExUnit.Case

  import AdventOfCode.Day11

  @day 11
  @year 2025

  @example1 ""

  test "part1 example1" do
    result = part1(@example1)

    assert result == nil
  end

  test "part1" do
    input = AdventOfCode.Input.get!(@day, @year)
    result = part1(input)

    assert result == nil
  end

  test "part2 example1" do
    result = part2(@example1)

    assert result == nil
  end

  test "part2" do
    input = AdventOfCode.Input.get!(@day, @year)
    result = part2(input)

    assert result == nil
  end
end
