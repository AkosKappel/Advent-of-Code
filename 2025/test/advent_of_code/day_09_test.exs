defmodule AdventOfCode.Day09Test do
  use ExUnit.Case

  import AdventOfCode.Day09

  @day 9
  @year 2025

  @example String.trim("""
           7,1
           11,1
           11,7
           9,7
           9,5
           2,5
           2,3
           7,3
           """)

  test "part1 example" do
    result = part1(@example)

    assert result == 50
  end

  test "part1" do
    input = AdventOfCode.Input.get!(@day, @year)
    result = part1(input)

    assert result == 4_756_718_172
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
