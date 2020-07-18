import { TStorageSelector } from '../types/storage-selector.type';

import { createKey } from './create-key';

export function createSelector<T>(selector: TStorageSelector<T>): TStorageSelector<T> {
    return {
        ...selector,
        selectorKey: createKey(
            [
                typeof selector?.filterFn === 'function' && selector?.filterFn.toString(),
                typeof selector?.compareFn === 'function' && selector?.compareFn.toString(),
                [new Date().getTime(), Math.random()],
            ],
            [],
            true
        ),
    };
}
