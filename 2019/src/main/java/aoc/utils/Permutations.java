package aoc.utils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

public class Permutations<T> implements Iterable<List<T>> {
    private final T[] array;
    private final List<List<T>> permutations;

    public Permutations(T[] arr) {
        array = arr;
        permutations = new ArrayList<>();
        generate(0);
    }

    private void generate(int start) {
        if (start == array.length) {
            List<T> permutation = new ArrayList<>(Arrays.asList(array));
            permutations.add(permutation);
            return;
        }

        for (int i = start; i < array.length; i++) {
            swap(array, start, i);
            generate(start + 1);
            swap(array, start, i);
        }
    }

    private void swap(T[] array, int i, int j) {
        T temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    @Override
    public Iterator<List<T>> iterator() {
        return permutations.iterator();
    }
}
