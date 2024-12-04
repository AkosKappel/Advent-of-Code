using System.Numerics;

namespace AdventOfCode;

public static class Directions {
    public static readonly Vector2 Up = Vector2.UnitY * -1;
    public static readonly Vector2 Down = Vector2.UnitY;
    public static readonly Vector2 Left = Vector2.UnitX * -1;
    public static readonly Vector2 Right = Vector2.UnitX;
    public static readonly Vector2 UpRight = Up + Right;
    public static readonly Vector2 UpLeft = Up + Left;
    public static readonly Vector2 DownRight = Down + Right;
    public static readonly Vector2 DownLeft = Down + Left;

    public static readonly Vector2[] Vertical = { Up, Down };
    public static readonly Vector2[] Horizontal = { Left, Right };
    public static readonly Vector2[] Cardinal = { Up, Down, Left, Right };
    public static readonly Vector2[] Diagonal = { UpRight, UpLeft, DownRight, DownLeft };
    public static readonly Vector2[] All = { Up, Down, Left, Right, UpRight, UpLeft, DownRight, DownLeft };
}