import { Inject, NgModule } from '@angular/core';

import { TStoreFeatureMap } from '../interfaces/store-feature-map.interface';
import { IStoreRootConfig } from '../interfaces/store-root-config.interface';
import { STORE_INTERNAL_ROOT_CONFIG_TOKEN } from '../models/store.tokens';

@NgModule({})
export class ImmutableStoreRootModule {
    public static storeFeatureMap: TStoreFeatureMap = {};

    protected static storeId: string = null;
    protected static isImmutableStore: boolean = true;

    constructor(@Inject(STORE_INTERNAL_ROOT_CONFIG_TOKEN) private storeConfig: IStoreRootConfig) {
        ImmutableStoreRootModule.storeId = this.storeConfig.id;

        if (this.storeConfig.hasOwnProperty('immutable')) {
            ImmutableStoreRootModule.isImmutableStore = this.storeConfig.immutable;
        }
    }
}
