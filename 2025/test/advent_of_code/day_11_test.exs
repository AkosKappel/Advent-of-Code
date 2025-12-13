defmodule AdventOfCode.Day11Test do
  use ExUnit.Case

  import AdventOfCode.Day11

  @day 11
  @year 2025

  @example String.trim("""
           aaa: you hhh
           you: bbb ccc
           bbb: ddd eee
           ccc: ddd eee fff
           ddd: ggg
           eee: out
           fff: out
           ggg: out
           hhh: ccc fff iii
           iii: out
           """)

  test "part1 example" do
    result = part1(@example)

    assert result == 5
  end

  test "part1" do
    input = AdventOfCode.Input.get!(@day, @year)
    result = part1(input)

    assert result == 674
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
