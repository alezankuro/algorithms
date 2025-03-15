export type Comparator<T> = (firstValue: T, secondValue: T) => number;

export function defaultComparator<T>(firstValue: T, secondValue: T) {
    return Number(firstValue) - Number(secondValue);
}

export function swap<T>(arr: T[], firstIndex: number, secondIndex: number) {
    [arr[firstIndex], arr[secondIndex]] = [arr[secondIndex], arr[firstIndex]];
}
