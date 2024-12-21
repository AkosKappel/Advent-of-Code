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

    // Aliases
    public static readonly Vector2 North = Up;
    public static readonly Vector2 South = Down;
    public static readonly Vector2 West = Left;
    public static readonly Vector2 East = Right;
    public static readonly Vector2 NorthEast = UpRight;
    public static readonly Vector2 NorthWest = UpLeft;
    public static readonly Vector2 SouthEast = DownRight;
    public static readonly Vector2 SouthWest = DownLeft;

    public static readonly Vector2[] Vertical = { Up, Down };
    public static readonly Vector2[] Horizontal = { Left, Right };
    public static readonly Vector2[] Orthogonal = { Up, Right, Down, Left };
    public static readonly Vector2[] Diagonal = { UpRight, DownRight, DownLeft, UpLeft };
    public static readonly Vector2[] All = { Up, UpRight, Right, DownRight, Down, DownLeft, Left, UpLeft };

    public enum RotationMode {
        Vertical,
        Horizontal,
        Orthogonal,
        Diagonal,
        All,
    }

    public static Vector2 RotateRight(
        this Vector2 direction,
        int times = 1,
        RotationMode mode = RotationMode.Orthogonal
    ) {
        var directions = mode switch {
            RotationMode.Vertical => Vertical,
            RotationMode.Horizontal => Horizontal,
            RotationMode.Orthogonal => Orthogonal,
            RotationMode.Diagonal => Diagonal,
            RotationMode.All => All,
            _ => throw new ArgumentOutOfRangeException(nameof(mode), mode, null)
        };

        var index = Array.IndexOf(directions, direction);
        if (index == -1) return Vector2.Zero;

        return directions[(index + times + directions.Length) % directions.Length];
    }

    public static Vector2 RotateLeft(
        this Vector2 direction,
        int times = 1,
        RotationMode mode = RotationMode.Orthogonal
    ) => RotateRight(direction, -times, mode);

    public static Vector2 Reverse(this Vector2 direction) => -direction;
    public static Vector2 Scale(this Vector2 direction, float scale) => direction * scale;

    public static bool IsOrthogonal(this Vector2 direction) => Orthogonal.Contains(direction);
    public static bool IsDiagonal(this Vector2 direction) => Diagonal.Contains(direction);
    public static bool IsVertical(this Vector2 direction) => Vertical.Contains(direction);
    public static bool IsHorizontal(this Vector2 direction) => Horizontal.Contains(direction);

    public static bool IsParallel(this Vector2 direction1, Vector2 direction2, double tolerance = 1e-9) =>
        Math.Abs(direction1.X * direction2.Y - direction1.Y * direction2.X) < tolerance;

    public static bool IsPerpendicular(this Vector2 direction1, Vector2 direction2) =>
        Vector2.Dot(direction1, direction2) == 0;

    public enum CodeType {
        Direction,
        World,
        Char,
    }

    private static readonly Dictionary<Vector2, string[]> Codes = new() {
        { Left, new[] { "L", "W", "<" } },
        { Up, new[] { "U", "N", "^" } },
        { Right, new[] { "R", "E", ">" } },
        { Down, new[] { "D", "S", "v" } },
        { UpLeft, new[] { "UL", "NW", "\u250c" } },
        { UpRight, new[] { "UR", "NE", "\u2510" } },
        { DownRight, new[] { "DR", "SE", "\u2518" } },
        { DownLeft, new[] { "DL", "SW", "\u2514" } },
    };

    public static string ToCode(this Vector2 direction, CodeType type = CodeType.Direction) =>
        Codes[direction][(int)type];
}