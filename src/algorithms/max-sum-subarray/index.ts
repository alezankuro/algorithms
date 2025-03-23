export type ValueAccessor<T> = (item: T) => number;

function defaultValueAccessor<T>(item: T) {
    return Number(item);
}

export function getMaxSumSubarray<T>(
    arr: T[],
    valueAccessor: ValueAccessor<T> = defaultValueAccessor
) {
    let currentSum = 0;
    let maxSum = -Infinity;
    let start = 0;
    let end = 0;
    let tempStart = 0;

    for (let i = 0; i < arr.length; i++) {
        currentSum += valueAccessor(arr[i]);

        if (currentSum > maxSum) {
            maxSum = currentSum;
            end = i;
            start = tempStart;
        }

        if (currentSum < 0) {
            currentSum = 0;
            tempStart = i + 1;
        }
    }

    return [start, end, maxSum];
}

export default getMaxSumSubarray;
