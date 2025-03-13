import { expect, it, describe, beforeEach } from 'bun:test';

import { Heap, MinHeap } from '.';

describe('Heap', () => {
    let heap: Heap<number>;

    beforeEach(() => {
        heap = new Heap([5, 3, 8, 1, 2]);
    });

    describe('constructor', () => {
        it('should initialize the heap with the given array', () => {
            expect(heap.values).toEqual([8, 3, 5, 1, 2]);
        });

        it('should build a valid max-heap', () => {
            expect(heap.values[0]).toBe(Math.max(...heap.values));
        });
    });

    describe('values', () => {
        it('should return the heap array', () => {
            expect(heap.values).toEqual([8, 3, 5, 1, 2]);
        });
    });

    describe('size', () => {
        it('should return the size of the heap', () => {
            expect(heap.size).toBe(5);
        });
    });

    describe('at', () => {
        it('should return the value at the given index', () => {
            expect(heap.at(0)).toBe(8);
            expect(heap.at(2)).toBe(5);
        });

        it('should throw an error if the index is out of range', () => {
            expect(() => heap.at(-1)).toThrow(
                'The index is out of range of the heap!'
            );
            expect(() => heap.at(10)).toThrow(
                'The index is out of range of the heap!'
            );
        });
    });

    describe('heapify', () => {
        it('should maintain the heap property for a subtree', () => {
            heap.heapify(1);
            expect(heap.values).toEqual([8, 3, 5, 1, 2]);
        });
    });

    describe('buildHeap', () => {
        it('should build a valid max-heap from the array', () => {
            const arr = [4, 10, 3, 5, 1];
            const newHeap = new Heap(arr);
            expect(newHeap.values).toEqual([10, 5, 3, 4, 1]);
        });
    });

    describe('add', () => {
        it('should add a new value and rebuild heap', () => {
            heap.add(10);
            expect(heap.values).toEqual([10, 3, 8, 1, 2, 5]);
        });
    });

    describe('extractRoot', () => {
        it('should extract the root value and maintain the heap property', () => {
            const root = heap.extractRoot();
            expect(root).toBe(8);
            expect(heap.values).toEqual([5, 3, 2, 1]);
        });

        it('should throw an error if the heap is empty', () => {
            const emptyHeap = new Heap<number>([]);
            expect(() => emptyHeap.extractRoot()).toThrow('Heap is empty!');
        });
    });

    describe('changeValue', () => {
        it('should increase a value and maintain the heap property', () => {
            heap.changeValue(3, 10);
            expect(heap.values).toEqual([10, 8, 5, 3, 2]);
        });

        it('should decrease a value and maintain the heap property', () => {
            heap.changeValue(0, 0);
            expect(heap.values).toEqual([5, 3, 0, 1, 2]);
        });

        it('should do nothing if the new value is equal to the current value', () => {
            heap.changeValue(2, 5);
            expect(heap.values).toEqual([8, 3, 5, 1, 2]);
        });
    });

    describe('sort', () => {
        it('should sort the heap in ascending order', () => {
            heap.sort();
            expect(heap.values).toEqual([1, 2, 3, 5, 8]);
        });
    });
});

describe('MinHeap', () => {
    let minHeap: MinHeap<number>;

    beforeEach(() => {
        minHeap = new MinHeap([5, 3, 8, 1, 2]);
    });

    describe('constructor', () => {
        it('should initialize the heap as a valid min-heap', () => {
            expect(minHeap.values[0]).toBe(Math.min(...minHeap.values));
            expect(minHeap.values).toEqual([1, 2, 8, 3, 5]);
        });
    });

    describe('add', () => {
        it('should add a new value and rebuild heap', () => {
            minHeap.add(0);
            expect(minHeap.values).toEqual([0, 2, 1, 3, 5, 8]);
        });
    });

    describe('extractRoot', () => {
        it('should extract the smallest element and maintain the min-heap property', () => {
            const root = minHeap.extractRoot();
            expect(root).toBe(1);
            expect(minHeap.values).toEqual([2, 3, 8, 5]);
        });

        it('should throw an error if the heap is empty', () => {
            const emptyHeap = new MinHeap<number>([]);
            expect(() => emptyHeap.extractRoot()).toThrow('Heap is empty!');
        });
    });

    describe('changeValue', () => {
        it('should decrease a value and maintain the min-heap property', () => {
            minHeap.changeValue(2, 0);
            expect(minHeap.values).toEqual([0, 2, 1, 3, 5]);
        });

        it('should increase a value and maintain the min-heap property', () => {
            minHeap.changeValue(0, 10);
            expect(minHeap.values).toEqual([2, 3, 8, 10, 5]);
        });
    });

    describe('sort', () => {
        it("should sort the heap in descending order (since it's a min-heap)", () => {
            minHeap.sort();
            expect(minHeap.values).toEqual([8, 5, 3, 2, 1]);
        });
    });
});
