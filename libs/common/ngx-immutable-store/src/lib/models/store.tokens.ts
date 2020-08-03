import { InjectionToken } from '@angular/core';

import { TStoreFeatureMap } from '../interfaces/store-feature-map.interface';
import { IImmutableStoreFeature } from '../interfaces/store-feature.interface';
import { IStoreRootConfig } from '../interfaces/store-root-config.interface';
import { FeatureManagerService } from '../services/feature-manager.service';

export const STORE_INTERNAL_FEATURE_MANAGER_SERVICE_TOKEN: InjectionToken<FeatureManagerService> = new InjectionToken(
    '@nwrx/store Internal Feature Manager Service'
);

export const STORE_INTERNAL_FEATURE_MAP_TOKEN: InjectionToken<TStoreFeatureMap> = new InjectionToken(
    '@nwrx/store Internal Store Feature Map'
);

export const STORE_INTERNAL_ROOT_CONFIG_TOKEN: InjectionToken<IStoreRootConfig> = new InjectionToken(
    '@nwrx/store Internal Store Root Config'
);

export const STORE_FEATURE_TOKEN: InjectionToken<IImmutableStoreFeature> = new InjectionToken(
    '@nwrx/store Store Feature'
);
