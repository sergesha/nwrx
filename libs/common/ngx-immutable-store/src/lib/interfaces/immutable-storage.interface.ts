import { Observable } from 'rxjs';

import { TStorageMap } from '../types/storage-map.type';
import { TStorageSelector } from '../types/storage-selector.type';

import { IKeyData } from './key-data.interface';

export interface IImmutableStorage<S> {
    /**
     * Create (insert or overwrite if already exists) one element
     * == POST
     * @param keyData - key and data as object or Array of objects
     */
    insert(keyData: IKeyData<S> | IKeyData<S>[]): void;

    /**
     * Read one (if key presents) or all element(s) as map-like object (IStorageMap)
     * @param key
     */
    read(key?: string): Observable<TStorageMap<S>>;

    /**
     * Get current snapshot (last value) of one (if key presents) or all element(s)
     * as map-like object (IStorageMap)
     * == GET
     * @param key
     */
    last(key?: string): TStorageMap<S>;

    /**
     * Update (patch or insert if not yet exists) one element
     * == PUT / PATCH
     * @param keyData - key and data as object or Array of objects
     */
    update(keyData: IKeyData<S> | IKeyData<S>[]): void;

    /**
     * Delete one or many elements
     * == DELETE
     * @param selector
     *  if string or string[] - key(s) to be removed
     *  if TStorageSelector<S> - selector of keys, to be removed
     */
    remove(selector: TStorageSelector<S> | string | string[]): void;

    /**
     * Delete all elements and reset storage to initial state if resetToInitialState = true
     */
    clear(resetToInitialState: boolean): void;

    /**
     * Retrieve list of all keys as observable
     * @param selector {
     *   filterFn: () => boolean;
     *   compareFn: () => number;
     * } - get filtered and sorted slice od data
     * @param onlyChanged - if true, return list of recently changed keys, false by default
     */
    keys(selector: TStorageSelector<S>, onlyChanged?: boolean): Observable<string[]>;

    /**
     * Retrieve list of all values as observable
     * @param selector {
     *   filterFn: () => boolean;
     *   compareFn: () => number;
     * } - get filtered and sorted slice od data
     * @param onlyChanged - if true, return list of recently changed values, false by default
     * */
    values(selector: TStorageSelector<S>, onlyChanged?: boolean): Observable<S[]>;

    /**
     * Destroy storage
     */
    destroy(): void;
}
