import { IImmutableStoreModel } from './store-model.interface';

export interface IImmutableStoreFeature<T = any, V extends IImmutableStoreModel = IImmutableStoreModel, S = T> {
    key: string;
    model: V;
}
