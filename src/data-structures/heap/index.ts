type Comparator<T> = (first: T, second: T) => number;

function defaultComparator<T>(firstValue: T, secondValue: T) {
    return Number(firstValue) - Number(secondValue);
}

export class Heap<T> {
    protected heap: T[] = [];

    protected comparator: Comparator<T> = defaultComparator;

    constructor(arr: T[]) {
        this.heap = arr;
        this.buildHeap();
    }

    public get values() {
        return this.heap;
    }

    public get size() {
        return this.heap.length;
    }

    public at(index: number) {
        if (index < 0 || index >= this.size)
            throw new Error('The index is out of range of the heap!');

        return this.heap[index];
    }

    protected compare(first: T, second: T) {
        return this.comparator(first, second);
    }

    protected compareAt(firstIndex: number, secondIndex: number) {
        return this.compare(this.heap[firstIndex], this.heap[secondIndex]);
    }

    protected getLeft(index: number) {
        return index * 2 + 1;
    }

    protected getRight(index: number) {
        return index * 2 + 2;
    }

    protected getParent(index: number) {
        return Math.floor((index - 1) / 2);
    }

    protected getLeftRight(index: number) {
        return [this.getLeft(index), this.getRight(index)];
    }

    protected swap(first: number, second: number) {
        [this.heap[first], this.heap[second]] = [
            this.heap[second],
            this.heap[first],
        ];
    }

    public heapify(index: number, heapSize: number = this.size) {
        const [left, right] = this.getLeftRight(index);
        let max = index;

        if (left < heapSize && this.compareAt(left, index) > 0) max = left;
        if (right < heapSize && this.compareAt(right, max) > 0) max = right;

        if (max !== index) {
            this.swap(index, max);
            this.heapify(max, heapSize);
        }
    }

    public heapifyUp(index: number) {
        let parentIndex = this.getParent(index);

        while (index >= 0 && this.compareAt(parentIndex, index) < 0) {
            this.swap(parentIndex, index);
            index = parentIndex;
            parentIndex = this.getParent(index);
        }
    }

    public add(value: T) {
        this.heap.push(value);
        this.heapifyUp(this.size - 1);
    }

    public buildHeap() {
        for (let i = Math.floor(this.size / 2) + 1; i >= 0; i--) {
            this.heapify(i);
        }
    }

    public extractRoot() {
        if (!this.size) throw new Error('Heap is empty!');

        const [root] = this.heap;

        this.swap(0, this.size - 1);
        this.heap.pop();
        this.heapify(0);

        return root;
    }

    public changeValue(index: number, value: T) {
        if (!this.compare(value, this.heap[index])) return;

        if (this.compare(value, this.heap[index]) > 0) {
            this.heap[index] = value;
            this.heapifyUp(index);
        } else {
            this.heap[index] = value;
            this.heapify(index);
        }
    }

    public sort() {
        this.buildHeap();

        for (let i = this.size - 1; i >= 0; i--) {
            this.swap(0, i);
            this.heapify(0, i);
        }
    }
}

export class MinHeap<T> extends Heap<T> {
    protected compare(first: T, second: T) {
        return -this.comparator(first, second);
    }
}

export default Heap;
