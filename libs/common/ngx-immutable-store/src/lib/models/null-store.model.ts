import { EMPTY, Observable } from 'rxjs';

import { IImmutableStorage } from '../interfaces/immutable-storage.interface';
import { IStoreModel } from '../interfaces/store-model.interface';
import { TStorageMap } from '../types/storage-map.type';
import { TStorageSelector } from '../types/storage-selector.type';

export class NullStoreModel<T, S = T> implements IStoreModel<T, S> {
    public readonly name: string = 'NullStoreModel';
    public readonly storage: IImmutableStorage<S> = null;

    public push(): void {}

    public read(): Observable<TStorageMap<S>> {
        return EMPTY;
    }

    public last(): TStorageMap<S> {
        return null;
    }

    public keys(selector: TStorageSelector<S>, onlyChanged: boolean = false): Observable<string[]> {
        return EMPTY;
    }

    public values(selector: TStorageSelector<S>, onlyChanged: boolean = false): Observable<S[]> {
        return EMPTY;
    }

    public remove(selector: TStorageSelector<S> | string | string[]): void {}

    public clear(resetToInitialState: boolean): void {}

    public destroy(): void {}
}
