import { expect, test, describe } from 'bun:test';

import { getMaxSumSubarray } from '.';

describe('max-sum-subarray', () => {
    test('should return left/right indexes and sum of max subarray', () => {
        const [left, right, sum] = getMaxSumSubarray([1, 2, -4, 2]);

        expect(left).toBe(0);
        expect(right).toBe(1);
        expect(sum).toBe(3);
    });

    test('should handle all positive numbers', () => {
        const [left, right, sum] = getMaxSumSubarray([1, 2, 3, 4]);

        expect(left).toBe(0);
        expect(right).toBe(3);
        expect(sum).toBe(10);
    });

    test('should handle all negative numbers', () => {
        const [left, right, sum] = getMaxSumSubarray([-1, -2, -3, -4]);

        expect(left).toBe(0);
        expect(right).toBe(0);
        expect(sum).toBe(-1);
    });

    test('should handle a single element array', () => {
        const [left, right, sum] = getMaxSumSubarray([5]);

        expect(left).toBe(0);
        expect(right).toBe(0);
        expect(sum).toBe(5);
    });

    test('should handle a mix of positive and negative numbers', () => {
        const [left, right, sum] = getMaxSumSubarray([
            -2, 1, -3, 4, -1, 2, 1, -5, 4,
        ]);

        expect(left).toBe(3);
        expect(right).toBe(6);
        expect(sum).toBe(6);
    });

    test('should handle an empty array', () => {
        const [left, right, sum] = getMaxSumSubarray([]);

        expect(left).toBe(0);
        expect(right).toBe(0);
        expect(sum).toBe(-Infinity);
    });

    test('should handle a case where the maximum subarray is at the end', () => {
        const [left, right, sum] = getMaxSumSubarray([-1, -2, -3, 4, 5]);

        expect(left).toBe(3);
        expect(right).toBe(4);
        expect(sum).toBe(9);
    });

    test('should handle a case where the maximum subarray is at the beginning', () => {
        const [left, right, sum] = getMaxSumSubarray([4, 5, -1, -2, -3]);

        expect(left).toBe(0);
        expect(right).toBe(1);
        expect(sum).toBe(9);
    });

    test('should handle a case where the maximum subarray is in the middle', () => {
        const [left, right, sum] = getMaxSumSubarray([-1, -2, 3, 4, -1, -2]);

        expect(left).toBe(2);
        expect(right).toBe(3);
        expect(sum).toBe(7);
    });

    test('should handle a case with alternating positive and negative numbers', () => {
        const [left, right, sum] = getMaxSumSubarray([1, -2, 3, -4, 5, -6, 7]);

        expect(left).toBe(6);
        expect(right).toBe(6);
        expect(sum).toBe(7);
    });

    test('should work with objects', () => {
        const data = [
            { value: 1 },
            { value: -3 },
            { value: 2 },
            { value: 4 },
            { value: -1 },
            { value: 5 },
            { value: -6 },
            { value: 1 },
        ];

        const [start, end, sum] = getMaxSumSubarray(data, ({ value }) => value);

        expect(start).toBe(2);
        expect(end).toBe(5);
        expect(sum).toBe(10);
    });

    test('should work with nested arrays', () => {
        const data = [
            [1, 2],
            [-3, 4],
            [2, -1],
            [4, 5],
            [-1, -2],
            [5, 3],
            [-6, 1],
            [1, 0],
        ];

        const [start, end, sum] = getMaxSumSubarray(
            data,
            ([firstItem]) => firstItem
        );

        expect(start).toBe(2);
        expect(end).toBe(5);
        expect(sum).toBe(10);
    });
});
