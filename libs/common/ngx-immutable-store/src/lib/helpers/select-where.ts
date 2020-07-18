import { TSelectCondition } from '../types/select-condition.type';
import { TStorageSelector } from '../types/storage-selector.type';

import { createSelector } from './create-selector';

export const selectWhere: <T>(...conditions: TSelectCondition<T>[]) => TStorageSelector<T> = <T>(
    ...conditions: TSelectCondition<T>[]
): TStorageSelector<T> =>
    createSelector({
        filterFn: (data: T) =>
            !conditions ||
            conditions.length === 0 ||
            conditions.every((condition: TSelectCondition<T>) =>
                typeof condition === 'function' ? condition(data) : condition
            ),
    });
