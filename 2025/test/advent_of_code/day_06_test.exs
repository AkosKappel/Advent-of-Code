defmodule AdventOfCode.Day06Test do
  use ExUnit.Case

  import AdventOfCode.Day06

  @day 6
  @year 2025

  @example1 String.trim("""
            123 328  51 64
             45 64  387 23
              6 98  215 314
            *   +   *   +
            """)

  test "part1 example1" do
    result = part1(@example1)

    assert result == 4277556
  end

  test "part1" do
    input = AdventOfCode.Input.get!(@day, @year)
    result = part1(input)

    assert result == 5361735137219
  end

  test "part2 example1" do
    result = part2(@example1)

    assert result == 3263827
  end

  test "part2" do
    input = AdventOfCode.Input.get!(@day, @year)
    result = part2(input)

    assert result == 11744693538946
  end
end
