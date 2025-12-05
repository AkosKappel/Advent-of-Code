defmodule AdventOfCode.Day03Test do
  use ExUnit.Case

  import AdventOfCode.Day03

  @day 3
  @year 2025

  @example1 String.trim("""
            987654321111111
            811111111111119
            234234234234278
            818181911112111
            """)

  test "part1 example1" do
    result = part1(@example1)

    assert result == 357
  end

  test "part1" do
    input = AdventOfCode.Input.get!(@day, @year)
    result = part1(input)

    assert result == 17074
  end

  test "part2 example1" do
    result = part2(@example1)

    assert result == 3121910778619
  end

  test "part2" do
    input = AdventOfCode.Input.get!(@day, @year)
    result = part2(input)

    assert result == 169512729575727
  end
end
