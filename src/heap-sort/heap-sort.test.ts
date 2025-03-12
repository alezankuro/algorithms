import { expect, test, describe } from 'bun:test';

import { heapSort } from '.';

describe('heapSort', () => {
    test('should sort an unsorted array', () => {
        const arr = [12, 3, 7, 9, 14, 6, 11];
        heapSort(arr);
        expect(arr).toEqual([3, 6, 7, 9, 11, 12, 14]);
    });

    test('should sort an already sorted array', () => {
        const arr = [1, 2, 3, 4, 5];
        heapSort(arr);
        expect(arr).toEqual([1, 2, 3, 4, 5]);
    });

    test('should sort a reverse-sorted array', () => {
        const arr = [5, 4, 3, 2, 1];
        heapSort(arr);
        expect(arr).toEqual([1, 2, 3, 4, 5]);
    });

    test('should handle an empty array', () => {
        const arr: number[] = [];
        heapSort(arr);
        expect(arr).toEqual([]);
    });

    test('should handle a single-element array', () => {
        const arr = [42];
        heapSort(arr);
        expect(arr).toEqual([42]);
    });

    test('should sort an array with duplicate values', () => {
        const arr = [5, 3, 7, 3, 5, 7];
        heapSort(arr);
        expect(arr).toEqual([3, 3, 5, 5, 7, 7]);
    });
});
