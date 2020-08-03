import { Observable } from 'rxjs';

import { TStorageMap } from '../types/storage-map.type';
import { TStorageSelector } from '../types/storage-selector.type';

import { IImmutableStorage } from './immutable-storage.interface';

/**
 * <T> - type of input data
 * <S> - type of data in storage, can differ from input type T
 */
export interface IImmutableStoreModel<T = any, S = T> {
    readonly name: string;
    readonly storage: IImmutableStorage<S>;

    push(data: T): void;

    /**
     * Read data from storage in storage's type <S>
     */
    read(key?: string): Observable<TStorageMap<S>>;

    /**
     * Get data snapshot from storage, type <S>
     */
    last(key?: string): TStorageMap<S>;

    /**
     * Get filtered and sorted list of data <S> keys
     * @param selector - set filterFn and compareFn
     * @param onlyChanged - if true, return list of recently changed keys, false by default
     */
    keys(selector?: TStorageSelector<S>, onlyChanged?: boolean): Observable<string[]>;

    /**
     * Get filtered and sorted list of data <S>
     * @param selector - set filterFn and compareFn
     * @param onlyChanged - if true, return list of recently changed values, false by default
     */
    values(selector?: TStorageSelector<S>, onlyChanged?: boolean): Observable<S[]>;

    /**
     * Remove selected data
     */
    remove(selector: TStorageSelector<S> | string | string[]): void;

    /**
     * Clear all model data
     */
    clear(resetToInitialState?: boolean): void;

    /**
     * Make all clear on destroy
     */
    destroy(): void;
}
