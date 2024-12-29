package aoc.utils;

import java.util.Objects;

public record Point3D(int x, int y, int z) {
    @Override
    public String toString() {
        return String.format("[%d, %d, %d]", x, y, z);
    }

    @Override
    public boolean equals(Object other) {
        if (this == other) return true;
        if (other == null || getClass() != other.getClass()) return false;
        Point3D p = (Point3D) other;
        return x == p.x && y == p.y && z == p.z;
    }

    @Override
    public int hashCode() {
        return Objects.hash(x, y, z);
    }
}
