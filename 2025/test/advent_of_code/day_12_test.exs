defmodule AdventOfCode.Day12Test do
  use ExUnit.Case

  import AdventOfCode.Day12

  @day 12
  @year 2025

  @example ""

  test "part1 example" do
    result = part1(@example)

    assert result == nil
  end

  test "part1" do
    input = AdventOfCode.Input.get!(@day, @year)
    result = part1(input)

    assert result == nil
  end

  test "part2 example" do
    result = part2(@example)

    assert result == nil
  end

  test "part2" do
    input = AdventOfCode.Input.get!(@day, @year)
    result = part2(input)

    assert result == nil
  end
end
