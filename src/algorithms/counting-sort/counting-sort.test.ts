import { expect, it, describe } from 'bun:test';

import { countingSort } from '.';

describe('countingSort', () => {
    it('should sort an unsorted array', () => {
        const arr = [12, 3, 7, 9, 14, 6, 11];

        expect(countingSort(arr)).toEqual([3, 6, 7, 9, 11, 12, 14]);
    });

    it('should sort an empty array', () => {
        const arr: number[] = [];

        expect(countingSort(arr)).toEqual([]);
    });

    it('should sort an array with one element', () => {
        const arr = [42];

        expect(countingSort(arr)).toEqual([42]);
    });

    it('should sort an already sorted array', () => {
        const arr = [1, 2, 3, 4, 5];

        expect(countingSort(arr)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should sort a reverse-sorted array', () => {
        const arr = [5, 4, 3, 2, 1];

        expect(countingSort(arr)).toEqual([1, 2, 3, 4, 5]);
    });

    it('should sort an array with duplicate elements', () => {
        const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];

        expect(countingSort(arr)).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
    });
});
