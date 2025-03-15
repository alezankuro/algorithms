import { swap, type Comparator, defaultComparator } from '../common';

function partition<T>(
    arr: T[],
    comparator: Comparator<T>,
    l = 0,
    r = arr.length - 1
) {
    let j = l - 1;

    for (let i = l; i < r; i++) {
        if (comparator(arr[i], arr[r]) < 0) {
            j++;
            swap(arr, i, j);
        }
    }

    swap(arr, j + 1, r);

    return j + 1;
}

export function quickSort<T>(
    arr: T[],
    comparator: Comparator<T> = defaultComparator,
    l = 0,
    r = arr.length - 1
) {
    if (l >= r) return;

    const q = partition(arr, comparator, l, r);
    quickSort(arr, comparator, l, q - 1);
    quickSort(arr, comparator, q + 1, r);
}

export default quickSort;
