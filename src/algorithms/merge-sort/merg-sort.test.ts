import { expect, test, describe } from 'bun:test';

import { mergeSort } from '.';

describe('mergeSort', () => {
    test('should sort an unsorted array', () => {
        const arr = [12, 3, 7, 9, 14, 6, 11];
        mergeSort(arr);
        expect(arr).toEqual([3, 6, 7, 9, 11, 12, 14]);
    });

    test('should sort an already sorted array', () => {
        const arr = [1, 2, 3, 4, 5];
        mergeSort(arr);
        expect(arr).toEqual([1, 2, 3, 4, 5]);
    });

    test('should sort a reverse-sorted array', () => {
        const arr = [5, 4, 3, 2, 1];
        mergeSort(arr);
        expect(arr).toEqual([1, 2, 3, 4, 5]);
    });

    test('should handle an empty array', () => {
        const arr: number[] = [];
        mergeSort(arr);
        expect(arr).toEqual([]);
    });

    test('should handle a single-element array', () => {
        const arr = [42];
        mergeSort(arr);
        expect(arr).toEqual([42]);
    });

    test('should sort an array with duplicate values', () => {
        const arr = [5, 3, 7, 3, 5, 7];
        mergeSort(arr);
        expect(arr).toEqual([3, 3, 5, 5, 7, 7]);
    });

    test('should sort an array with string values', () => {
        const arr = ['gamma', 'alpha', 'beta', 'omega'];
        const comparator = (firstValue: string, secondValue: string) =>
            firstValue.localeCompare(secondValue);

        mergeSort(arr, comparator);

        expect(arr).toEqual(['alpha', 'beta', 'gamma', 'omega']);
    });

    test('should sort an array with object values', () => {
        type ArrValue = { value: number };

        const arr: ArrValue[] = [
            { value: 1 },
            { value: 5 },
            { value: 3 },
            { value: 7 },
        ];
        const comparator = (firstValue: ArrValue, secondValue: ArrValue) =>
            firstValue.value - secondValue.value;

        mergeSort(arr, comparator);

        expect(arr).toEqual([
            { value: 1 },
            { value: 3 },
            { value: 5 },
            { value: 7 },
        ]);
    });
});
