defmodule AdventOfCode.Day01Test do
  use ExUnit.Case

  import AdventOfCode.Day01

  @day 1
  @year 2025

  @example1 String.trim("""
L68
L30
R48
L5
R60
L55
L1
L99
R14
L82
""")

  test "part1 example1" do
    result = part1(@example1)

    assert result == 3
  end

  test "part1" do
    input = AdventOfCode.Input.get!(@day, @year)
    result = part1(input)

    assert result == 1120
  end

  test "part2 example1" do
    result = part2(@example1)

    assert result == 6
  end

  test "part2" do
    input = AdventOfCode.Input.get!(@day, @year)
    result = part2(input)

    assert result == 6554
  end
end
