defmodule Mix.Tasks.D09.P2 do
  use Mix.Task

  import AdventOfCode.Day09

  @shortdoc "Day 09 Part 2"
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
      do: Benchee.run(%{part_2: fn -> input |> part2() end}),
      else:
        input
        |> part2()
        |> IO.inspect(label: "Part 2 Results")
  end
end
