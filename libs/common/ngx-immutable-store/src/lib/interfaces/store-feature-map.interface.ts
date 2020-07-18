import { IStoreFeature } from './store-feature.interface';
import { IStoreModel } from './store-model.interface';

export type TStoreFeatureMap<T = any, V extends IStoreModel = IStoreModel> = {
    [p in keyof T]: IStoreFeature<T[p], V>;
};
