defmodule AdventOfCode.Day10Test do
  use ExUnit.Case

  import AdventOfCode.Day10

  @day 10
  @year 2025

  @example String.trim("""
           [.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
           [...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
           [.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}
           """)

  test "part1 example" do
    result = part1(@example)

    assert result == 7
  end

  test "part1" do
    input = AdventOfCode.Input.get!(@day, @year)
    result = part1(input)

    assert result == 486
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
