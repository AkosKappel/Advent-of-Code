defmodule Mix.Tasks.D09.P1 do
  use Mix.Task

  import AdventOfCode.Day09

  @shortdoc "Day 09 Part 1"
  def run(args) do
    input = AdventOfCode.Input.get!(9, 2025)
    input = String.trim("""
            7,1
            11,1
            11,7
            9,7
            9,5
            2,5
            2,3
            7,3
            """)

    if Enum.member?(args, "-b"),
      do: Benchee.run(%{part_1: fn -> input |> part1() end}),
      else:
        input
        |> part1()
        |> IO.inspect(label: "Part 1 Results")
  end
end
