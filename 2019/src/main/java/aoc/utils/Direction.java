package aoc.utils;

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

    public Point move(int x, int y) {
        return switch (this) {
            case UP -> new Point(x, y - 1);
            case LEFT -> new Point(x - 1, y);
            case DOWN -> new Point(x, y + 1);
            case RIGHT -> new Point(x + 1, y);
        };
    }

    public Point3D move(Point3D p) {
        return switch (this) {
            case UP -> new Point3D(p.x(), p.y() - 1, p.z());
            case LEFT -> new Point3D(p.x() - 1, p.y(), p.z());
            case DOWN -> new Point3D(p.x(), p.y() + 1, p.z());
            case RIGHT -> new Point3D(p.x() + 1, p.y(), p.z());
        };
    }
}
