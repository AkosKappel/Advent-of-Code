defmodule AdventOfCode.Day09Test do
  use ExUnit.Case

  import AdventOfCode.Day09

  @day 9
  @year 2025

  @example1 String.trim("""
            7,1
            11,1
            11,7
            9,7
            9,5
            2,5
            2,3
            7,3
            """)

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
