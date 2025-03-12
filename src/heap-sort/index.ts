function swap<T>(arr: T[], first: number, second: number) {
    [arr[first], arr[second]] = [arr[second], arr[first]];
}

function heapify(arr: number[], index: number, heapSize: number) {
    const left = index * 2 + 1;
    const right = index * 2 + 2;
    let max = index;

    if (left < heapSize && arr[left] > arr[index]) {
        max = left;
    }

    if (right < heapSize && arr[right] > arr[max]) {
        max = right;
    }

    if (max !== index) {
        swap(arr, index, max);
        heapify(arr, max, heapSize);
    }
}

function buildHeap(arr: number[]) {
    const n = arr.length;

    for (let i = Math.floor(n / 2) + 1; i >= 0; i--) {
        heapify(arr, i, n);
    }
}

export function heapSort(arr: number[]) {
    buildHeap(arr);

    for (let i = arr.length - 1; i >= 0; i--) {
        swap(arr, 0, i);
        heapify(arr, 0, i);
    }
}

export default heapSort;
