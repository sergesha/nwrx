import { Observable } from 'rxjs';

export interface IStoreFeatureDataProvider<T> {
    connect(source$: Observable<T>): Observable<T>;
    disconnect(): void;
}
