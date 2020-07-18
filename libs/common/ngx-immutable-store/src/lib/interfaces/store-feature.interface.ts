import { IStoreModel } from './store-model.interface';

export interface IStoreFeature<T = any, V extends IStoreModel = IStoreModel, S = T> {
    key: string;
    model: V;
}
