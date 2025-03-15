export function countingSort(arr: number[]) {
    const res = Array.from(arr, () => 0);
    const countArr = Array.from({ length: Math.max(...arr) + 1 }, () => 0);

    for (let item of arr) countArr[item]++;

    for (let i = 1; i < countArr.length; i++) {
        countArr[i] += countArr[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        res[countArr[arr[i]] - 1] = arr[i];
        countArr[arr[i]]--;
    }

    return res;
}

export default countingSort;
