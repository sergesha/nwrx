import { defer, of, BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, map, shareReplay, startWith, switchMap, take } from 'rxjs/operators';

import { binarySearch, createKey, deepClone } from '../helpers';
import { createSelector } from '../helpers/create-selector';
import { IBinarySearchResult } from '../interfaces/binary-search-result.interface';
import { IImmutableStorage } from '../interfaces/immutable-storage.interface';
import { IKeyData } from '../interfaces/key-data.interface';
import { TRequireOnlyOne } from '../types/require-only-one.type';
import { TStorageMap } from '../types/storage-map.type';
import { TStorageSelector } from '../types/storage-selector.type';

export interface IInMemoryImmutableStorageConfig<S> {
    initialState?: TStorageMap<S>;
    immutable?: boolean;
}

type TArrangeKeys = TRequireOnlyOne<
    {
        upsert: string[];
        remove: string[];
    },
    'upsert' | 'remove'
>;

export class InMemoryImmutableStorage<S> implements IImmutableStorage<S> {
    private readonly isImmutableStore: boolean;
    private readonly initialState: TStorageMap<S>;
    private readonly storage$: BehaviorSubject<TStorageMap<S>>;
    private readonly arrangeKeys$: Subject<TArrangeKeys> = new Subject();
    private readonly selectedKeys$: Map<string, Observable<string[]>> = new Map();

    constructor(config: IInMemoryImmutableStorageConfig<S> = { initialState: null, immutable: true }) {
        this.isImmutableStore = config.immutable;
        this.initialState = config.initialState;

        this.storage$ = new BehaviorSubject(this.initialState);
    }

    public insert(keyData: IKeyData<S> | IKeyData<S>[]): void {
        if (keyData) {
            if (!Array.isArray(keyData)) {
                keyData = [keyData];
            }

            const data: TStorageMap<S> = keyData.reduce((acc: TStorageMap<S>, item: IKeyData<S>) => {
                return {
                    ...acc,
                    [item.key]: this.isImmutableStore ? (deepClone(item.data) as S) : (item.data as S),
                };
            }, {});

            this.storage$.next({
                ...(this.last() || {}),
                ...data,
            });

            this.arrangeKeys$.next({
                upsert: keyData.map((item: IKeyData<S>) => item.key),
            });
        }
    }

    public read(key?: string): Observable<TStorageMap<S>> {
        return this.storage$.asObservable().pipe(
            map((data: TStorageMap<S>) => {
                const returnValue: TStorageMap<S> = !!key ? { [key]: data[key] } : data;

                return this.isImmutableStore ? deepClone(returnValue) : returnValue;
            }),
            shareReplay({
                bufferSize: 1,
                refCount: true,
            })
        );
    }

    public last(key?: string): TStorageMap<S> {
        const returnValue: TStorageMap<S> =
            !!key && !!this.storage$.value ? { [key]: this.storage$.value[key] } : this.storage$.value;

        return this.isImmutableStore ? deepClone(returnValue) : returnValue;
    }

    public update(keyData: IKeyData<S> | IKeyData<S>[]): void {
        if (keyData) {
            if (!Array.isArray(keyData)) {
                keyData = [keyData];
            }

            const data: TStorageMap<S> = keyData.reduce((acc: TStorageMap<S>, item: IKeyData<S>) => {
                return {
                    ...acc,
                    [item.key]: Object.assign(
                        {},
                        this.last(item.key)[item.key],
                        this.isImmutableStore ? deepClone(item.data) : item.data
                    ),
                };
            }, {});

            this.storage$.next({
                ...(this.last() || {}),
                ...data,
            });

            this.arrangeKeys$.next({
                upsert: keyData.map((item: IKeyData<S>) => item.key),
            });
        }
    }

    public remove(selector: TStorageSelector<S> | string | string[]): void {
        if (selector) {
            let observable$: Observable<string[]>;

            defer(() => {
                if (typeof selector === 'object' && !Array.isArray(selector)) {
                    observable$ = this.keys(createSelector(selector));
                } else {
                    if (!Array.isArray(selector) && typeof selector === 'string') {
                        selector = [selector];
                    }
                    observable$ = of(selector);
                }

                return observable$;
            })
                .pipe(take(1))
                .subscribe((keys: string[]) => {
                    const last: TStorageMap<S> = this.last();

                    if (last) {
                        for (let i: number = 0; i < keys.length; i++) {
                            const key: string = keys[i];

                            if (last[key]) {
                                delete last[key];
                            }
                        }

                        this.storage$.next(last);
                        this.arrangeKeys$.next({ remove: keys });
                    }
                });
        }
    }

    public clear(resetToInitialState: boolean = false): void {
        this.arrangeKeys$.next({
            remove: this.storage$.value ? Object.keys(this.storage$.value) : [],
        });

        this.storage$.next(resetToInitialState ? this.initialState : null);

        if (this.storage$.value) {
            this.arrangeKeys$.next({
                upsert: this.storage$.value ? Object.keys(this.storage$.value) : [],
            });
        }
    }

    public keys(selector?: TStorageSelector<S>, onlyChanged: boolean = false): Observable<string[]> {
        const { filterFn, compareFn }: TStorageSelector<S> = selector || {};
        const selectorKey: string =
            selector?.selectorKey ??
            createKey(
                [
                    typeof filterFn === 'function' && filterFn.toString(),
                    typeof compareFn === 'function' && compareFn.toString(),
                ],
                [],
                true
            );

        if (!this.selectedKeys$.has(selectorKey)) {
            this.selectedKeys$.set(
                selectorKey,
                of(this.storage$.value).pipe(
                    // Run for filter and sort the initial data
                    map((data: TStorageMap<S>) => (data && Object.keys(data)) || []),
                    map((data: string[]) =>
                        typeof filterFn === 'function'
                            ? data.filter((item: string) => filterFn(this.valueByKey(item)))
                            : data
                    ),
                    map((data: string[]) =>
                        typeof compareFn === 'function'
                            ? data.sort((a: string, b: string) => compareFn(this.valueByKey(a), this.valueByKey(b)))
                            : data
                    ),
                    // Then listen to changes and filter and sort one by one
                    switchMap((keyList: string[]) =>
                        this.arrangeKeys$.pipe(
                            filter(
                                (arrangeKeys: TArrangeKeys) =>
                                    arrangeKeys?.remove?.some((key: string) => keyList.includes(key)) ||
                                    arrangeKeys?.upsert?.some(
                                        (key: string) =>
                                            typeof filterFn !== 'function' || filterFn(this.valueByKey(key))
                                    )
                            ),
                            map((arrangeKeys: TArrangeKeys) => {
                                const removeKey: (key: string, list: string[]) => void = (
                                    key: string,
                                    list: string[]
                                ): void => {
                                    const removeIndex: number = list.indexOf(key);

                                    if (removeIndex > -1) {
                                        list.splice(removeIndex, 1);
                                    }
                                };

                                if (arrangeKeys.remove?.length) {
                                    for (let i: number = 0; i < arrangeKeys.remove.length; i++) {
                                        removeKey(arrangeKeys.remove[i], keyList);
                                    }
                                }

                                if (arrangeKeys.upsert?.length) {
                                    for (let i: number = 0; i < arrangeKeys.upsert.length; i++) {
                                        const key: string = arrangeKeys.upsert[i];

                                        removeKey(key, keyList);

                                        if (typeof filterFn !== 'function' || filterFn(this.valueByKey(key))) {
                                            if (typeof compareFn === 'function') {
                                                const item: IBinarySearchResult = binarySearch.call(
                                                    this,
                                                    key,
                                                    keyList,
                                                    compareFn,
                                                    this.valueByKey
                                                );

                                                keyList.splice(item.index, item.found ? 1 : 0, key);
                                            } else {
                                                keyList.push(key);
                                            }
                                        }
                                    }
                                }

                                return onlyChanged
                                    ? keyList.filter((key: string) => arrangeKeys.upsert?.includes(key))
                                    : keyList;
                            }),
                            startWith(keyList)
                        )
                    ),
                    // TODO: remove memorized selector on complete, if flag set
                    shareReplay({
                        bufferSize: 1,
                        refCount: true,
                    })
                )
            );
        }

        return this.selectedKeys$.get(selectorKey);
    }

    public values(selector?: TStorageSelector<S>, onlyChanged: boolean = false): Observable<S[]> {
        return this.keys(selector, onlyChanged).pipe(
            map((data: string[]) => data.map((key: string) => this.valueByKey(key)))
        );
    }

    public destroy(): void {
        this.clear(false);
        this.storage$.complete();
    }

    private valueByKey(key: string): TStorageMap<S>[string] {
        return !!this.storage$.value
            ? this.isImmutableStore
                ? deepClone(this.storage$.value[key])
                : this.storage$.value[key]
            : null;
    }
}
