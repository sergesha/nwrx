import { IImmutableStoreFeature } from './store-feature.interface';
import { IImmutableStoreModel } from './store-model.interface';

export type TStoreFeatureMap<T = any, V extends IImmutableStoreModel = IImmutableStoreModel> = {
    [p in keyof T]: IImmutableStoreFeature<T[p], V>;
};
