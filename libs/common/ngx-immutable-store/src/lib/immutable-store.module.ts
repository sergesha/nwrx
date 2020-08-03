import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { IStoreRootConfig } from './interfaces/store-root-config.interface';
import {
    STORE_INTERNAL_FEATURE_MANAGER_SERVICE_TOKEN,
    STORE_INTERNAL_FEATURE_MAP_TOKEN,
    STORE_INTERNAL_ROOT_CONFIG_TOKEN,
} from './models/store.tokens';
import { featureManagerServiceFactory } from './services/feature-manager.service';
import { ImmutableStoreService } from './services/immutable-store.service';
import { ImmutableStoreRootModule } from './store-root/immutable-store-root.module';

@NgModule({
    imports: [CommonModule],
})
export class ImmutableStoreModule {
    public static forRoot(storeRootConfig: IStoreRootConfig): ModuleWithProviders<ImmutableStoreRootModule> {
        return {
            ngModule: ImmutableStoreRootModule,
            providers: [
                {
                    provide: STORE_INTERNAL_FEATURE_MAP_TOKEN,
                    useValue: ImmutableStoreRootModule.storeFeatureMap,
                },
                {
                    provide: STORE_INTERNAL_FEATURE_MANAGER_SERVICE_TOKEN,
                    useFactory: featureManagerServiceFactory,
                },
                {
                    provide: STORE_INTERNAL_ROOT_CONFIG_TOKEN,
                    useValue: storeRootConfig,
                },
                ImmutableStoreService,
            ],
        };
    }
}
