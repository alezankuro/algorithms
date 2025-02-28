export type Comparator<T> = (firstValue: T, secondValue: T) => number;

function defaultComparator<T>(firstValue: T, secondValue: T) {
    return Number(firstValue) - Number(secondValue);
}

function merge<T>(
    arr: T[],
    comparator: Comparator<T>,
    l: number,
    q: number,
    r: number
) {
    const left = arr.slice(l, q + 1);
    const right = arr.slice(q + 1, r + 1);

    let i = 0;
    let j = 0;
    let k = l;

    while (i < left.length && j < right.length) {
        if (comparator(left[i], right[j]) <= 0) {
            arr[k++] = left[i++];
        } else {
            arr[k++] = right[j++];
        }
    }

    while (i < left.length) arr[k++] = left[i++];
    while (j < right.length) arr[k++] = right[j++];
}

export function mergeSort<T>(
    arr: T[],
    comparator: Comparator<T> = defaultComparator,
    l = 0,
    r = arr.length - 1
) {
    if (l >= r) return;

    const q = Math.floor((l + r) / 2);

    mergeSort(arr, comparator, l, q);
    mergeSort(arr, comparator, q + 1, r);
    merge(arr, comparator, l, q, r);
}

export default mergeSort;
