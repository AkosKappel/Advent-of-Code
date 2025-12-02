defmodule AdventOfCode.Day02Test do
  use ExUnit.Case

  import AdventOfCode.Day02

  @day 2
  @year 2025

  @example1 "11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124"

  test "part1 example1" do
    result = part1(@example1)

    assert result == 1227775554
  end

  test "part1" do
    input = AdventOfCode.Input.get!(@day, @year)
    result = part1(input)

    assert result == 28844599675
  end

  test "part2 example1" do
    result = part2(@example1)

    assert result == 4174379265
  end

  test "part2" do
    input = AdventOfCode.Input.get!(@day, @year)
    result = part2(input)

    assert result == 48778605167
  end
end
