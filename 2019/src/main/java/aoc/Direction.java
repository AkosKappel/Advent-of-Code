package aoc;

import java.awt.*;

public enum Direction {
    UP, LEFT, DOWN, RIGHT;

    public Direction turnLeft() {
        return values()[(ordinal() + 1) % 4];
    }

    public Direction turnRight() {
        return values()[(ordinal() + 3) % 4];
    }

    public Direction reverse() {
        return values()[(ordinal() + 2) % 4];
    }

    public Point move(Point p) {
        return switch (this) {
            case UP -> new Point(p.x, p.y - 1);
            case LEFT -> new Point(p.x - 1, p.y);
            case DOWN -> new Point(p.x, p.y + 1);
            case RIGHT -> new Point(p.x + 1, p.y);
        };
    }
}
