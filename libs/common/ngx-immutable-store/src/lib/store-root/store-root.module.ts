import { Inject, NgModule } from '@angular/core';

import { TStoreFeatureMap } from '../interfaces/store-feature-map.interface';
import { IStoreRootConfig } from '../interfaces/store-root-config.interface';
import { STORE_INTERNAL_ROOT_CONFIG_TOKEN } from '../models/store.tokens';

@NgModule({})
export class StoreRootModule {
    public static storeFeatureMap: TStoreFeatureMap = {};

    protected static storeId: string = null;
    protected static isImmutableStore: boolean = true;

    constructor(@Inject(STORE_INTERNAL_ROOT_CONFIG_TOKEN) private storeConfig: IStoreRootConfig) {
        StoreRootModule.storeId = this.storeConfig.id;

        if (this.storeConfig.hasOwnProperty('immutable')) {
            StoreRootModule.isImmutableStore = this.storeConfig.immutable;
        }
    }
}
