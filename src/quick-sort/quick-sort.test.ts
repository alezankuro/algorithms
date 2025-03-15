import { expect, it, describe } from 'bun:test';

import { quickSort } from '.';

describe('quickSort', () => {
    it('should sort an unsorted array', () => {
        const arr = [12, 3, 7, 9, 14, 6, 11];
        quickSort(arr);
        expect(arr).toEqual([3, 6, 7, 9, 11, 12, 14]);
    });

    it('should sort an empty array', () => {
        const arr: number[] = [];
        quickSort(arr);
        expect(arr).toEqual([]);
    });

    it('should sort an array with one element', () => {
        const arr = [42];
        quickSort(arr);
        expect(arr).toEqual([42]);
    });

    it('should sort an already sorted array', () => {
        const arr = [1, 2, 3, 4, 5];
        quickSort(arr);
        expect(arr).toEqual([1, 2, 3, 4, 5]);
    });

    it('should sort a reverse-sorted array', () => {
        const arr = [5, 4, 3, 2, 1];
        quickSort(arr);
        expect(arr).toEqual([1, 2, 3, 4, 5]);
    });

    it('should sort an array with duplicate elements', () => {
        const arr = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
        quickSort(arr);
        expect(arr).toEqual([1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]);
    });

    it('should sort an array with negative numbers', () => {
        const arr = [-3, -1, -4, -1, -5, -9, -2, -6, -5, -3, -5];
        quickSort(arr);
        expect(arr).toEqual([-9, -6, -5, -5, -5, -4, -3, -3, -2, -1, -1]);
    });

    it('should sort an array with mixed positive and negative numbers', () => {
        const arr = [-3, 1, -4, 1, 5, -9, 2, 6, -5, 3, 5];
        quickSort(arr);
        expect(arr).toEqual([-9, -5, -4, -3, 1, 1, 2, 3, 5, 5, 6]);
    });

    it('should sort an array of strings using a custom comparator', () => {
        const arr = ['banana', 'apple', 'cherry', 'date'];
        const stringComparator = (a: string, b: string) => a.localeCompare(b);

        quickSort(arr, stringComparator);

        expect(arr).toEqual(['apple', 'banana', 'cherry', 'date']);
    });

    it('should sort an array of mixed objects using a custom comparator', () => {
        const arr = [
            { name: 'Alice', age: 25 },
            { name: 'Bob', age: 30 },
            { name: 'Charlie', age: 20 },
        ];
        const ageComparator = (a: { age: number }, b: { age: number }) =>
            a.age - b.age;

        quickSort(arr, ageComparator);

        expect(arr).toEqual([
            { name: 'Charlie', age: 20 },
            { name: 'Alice', age: 25 },
            { name: 'Bob', age: 30 },
        ]);
    });
});
