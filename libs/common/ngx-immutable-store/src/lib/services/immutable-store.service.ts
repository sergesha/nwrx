import { Inject, Injectable } from '@angular/core';

import { IImmutableStoreFeature } from '../interfaces/store-feature.interface';
import { IImmutableStoreModel } from '../interfaces/store-model.interface';
import { NullStoreModel } from '../models/null-store.model';
import { STORE_INTERNAL_FEATURE_MANAGER_SERVICE_TOKEN } from '../models/store.tokens';

import { FeatureManagerService } from './feature-manager.service';

@Injectable()
export class ImmutableStoreService {
    constructor(
        @Inject(STORE_INTERNAL_FEATURE_MANAGER_SERVICE_TOKEN) private featureManagerService: FeatureManagerService
    ) {}

    public use<T, S = T>(key: string): IImmutableStoreModel<T, S> | null {
        const feature: IImmutableStoreFeature = this.featureManagerService.getFeature(key);
        return feature ? Object.seal(feature.model) : Object.freeze(new NullStoreModel<T, S>());
    }
}
