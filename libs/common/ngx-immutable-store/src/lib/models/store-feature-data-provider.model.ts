import { OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { shareReplay, takeUntil } from 'rxjs/operators';

import { IStoreFeatureDataProvider } from '../interfaces/store-feature-data-provider.interface';

// TODO: Add Angular decorator.
export class StoreFeatureDataProvider<T> implements IStoreFeatureDataProvider<T>, OnDestroy {
    private onDestroy$: Subject<void> = new Subject();
    private rawData$: Observable<T>;

    public ngOnDestroy(): void {
        this.disconnect();
    }

    public connect(source$: Observable<T>): Observable<T> {
        if (!this.rawData$) {
            this.rawData$ = source$.pipe(
                shareReplay({
                    refCount: true,
                    bufferSize: 1,
                }),
                takeUntil(this.onDestroy$)
            );
        }

        return this.rawData$;
    }

    public disconnect(): void {
        this.onDestroy$.next();
        this.rawData$ = null;
    }
}
