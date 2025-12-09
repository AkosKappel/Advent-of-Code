defmodule AdventOfCode.Day03Test do
  use ExUnit.Case

  import AdventOfCode.Day03

  @day 3
  @year 2025

  @example String.trim("""
           987654321111111
           811111111111119
           234234234234278
           818181911112111
           """)

  test "part1 example" do
    result = part1(@example)

    assert result == 357
  end

  test "part1" do
    input = AdventOfCode.Input.get!(@day, @year)
    result = part1(input)

    assert result == 17074
  end

  test "part2 example" do
    result = part2(@example)

    assert result == 3_121_910_778_619
  end

  test "part2" do
    input = AdventOfCode.Input.get!(@day, @year)
    result = part2(input)

    assert result == 169_512_729_575_727
  end
end
