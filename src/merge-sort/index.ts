export type Comparator<T> = (firstValue: T, secondValue: T) => number;

function defaultComparator<T>(firstValue: T, secondValue: T) {
    return Number(firstValue) - Number(secondValue);
}

export function merge<T>(
    arr: T[],
    comparator: Comparator<T>,
    l: number,
    q: number,
    r: number
) {
    const res = [];
    let i = l;
    let j = q + 1;

    while (i <= q && j <= r) {
        if (comparator(arr[i], arr[j]) <= 0) {
            res.push(arr[i++]);
        } else {
            res.push(arr[j++]);
        }
    }

    while (i <= q) res.push(arr[i++]);
    while (j <= r) res.push(arr[j++]);

    res.forEach((value, index) => (arr[l + index] = value));
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
