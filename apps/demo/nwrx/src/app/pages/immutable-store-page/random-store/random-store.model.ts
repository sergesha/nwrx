import { Injectable, NgModule, OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
    InMemoryImmutableStorage,
    IImmutableStorage,
    IImmutableStoreModel,
    TRequireAtLeastOne,
    TStorageMap,
    TStorageSelector,
} from '@nwrx/common/ngx-immutable-store';

// const createKeyFor: (type: ETradeHistoryType, data: ITradeHistoryStoreData | Trade.AsObject) => string =
//     (type: ETradeHistoryType, data: ITradeHistoryStoreData | Trade.AsObject) => createKey(data, KEY_PROPS[type], true);

export interface IRandomStoreData {
    timestamp: number;
    value: number;
}

@Injectable()
export class RandomStoreModel implements IImmutableStoreModel<IRandomStoreData>, OnDestroy {
    public readonly name: string = 'RandomStoreModel';
    public readonly storage: IImmutableStorage<IRandomStoreData> = new InMemoryImmutableStorage({ immutable: true });
    private onDestroy$: Subject<void> = new Subject();

    public ngOnDestroy(): void {
        this.onDestroy$.next();
    }

    public push(data: IRandomStoreData): void {}

    public read(key?: string): Observable<TStorageMap<IRandomStoreData>> {
        return this.storage.read(key);
    }

    public last(key?: string): TStorageMap<IRandomStoreData> {
        return this.storage.last(key);
    }

    public keys(selector?: TStorageSelector<IRandomStoreData>): Observable<string[]> {
        return this.storage.keys(selector);
    }

    public values(selector?: TStorageSelector<IRandomStoreData>): Observable<IRandomStoreData[]> {
        return this.storage.values(selector);
    }

    public remove(
        selector: TRequireAtLeastOne<TStorageSelector<IRandomStoreData>, 'filterFn'> | string | string[]
    ): void {
        this.storage.remove(selector);
    }

    public clear(resetToInitialState: boolean = false): void {
        this.storage.clear(resetToInitialState);
    }

    public destroy(): void {
        this.storage.destroy();
    }
}
