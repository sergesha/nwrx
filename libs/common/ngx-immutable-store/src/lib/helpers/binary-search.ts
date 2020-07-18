import { IBinarySearchResult } from '../interfaces/binary-search-result.interface';

export function binarySearch<T>(
    item: string,
    list: string[],
    compareFn: (a: T, b: T) => number,
    fetchValueFn: (key: string) => T
): IBinarySearchResult {
    let result: IBinarySearchResult = { index: 0, found: false };

    if (item && list?.length && typeof compareFn === 'function' && typeof fetchValueFn === 'function') {
        let low: number = 0;
        let high: number = list.length - 1;

        while (low <= high) {
            const middle: number = Math.trunc((high + low) / 2);
            const compare: number = compareFn.call(
                this,
                fetchValueFn.call(this, list[middle]),
                fetchValueFn.call(this, item)
            );

            if (compare === 0) {
                result = { index: middle, found: true };
                break;
            }

            if (compare > 0) {
                high = middle - 1;
            } else {
                low = middle + 1;
            }

            if (low > high) {
                result = { index: compare > 0 ? middle : middle + 1, found: false };
                break;
            }
        }
    }

    return result;
}
