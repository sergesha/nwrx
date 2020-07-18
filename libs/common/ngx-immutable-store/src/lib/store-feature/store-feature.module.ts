import { Inject, NgModule, OnDestroy } from '@angular/core';

import { IStoreFeature } from '../interfaces/store-feature.interface';
import { IStoreModel } from '../interfaces/store-model.interface';
import { STORE_FEATURE_TOKEN, STORE_INTERNAL_FEATURE_MANAGER_SERVICE_TOKEN } from '../models/store.tokens';
import { FeatureManagerService } from '../services/feature-manager.service';

export function storeFeatureFactory(featureName: string, model: IStoreModel): IStoreFeature {
    return {
        key: featureName,
        model: model,
    };
}

// TODO: Add Angular decorator.
@NgModule({})
export class StoreFeatureModule implements OnDestroy {
    constructor(
        @Inject(STORE_FEATURE_TOKEN) private features: IStoreFeature | IStoreFeature[],
        @Inject(STORE_INTERNAL_FEATURE_MANAGER_SERVICE_TOKEN) private featureManagerService: FeatureManagerService
    ) {
        this.featureManagerService.addFeatures(this.features);
    }

    // tslint:disable-next-line:contextual-lifecycle
    public ngOnDestroy(): void {
        this.featureManagerService.removeFeatures(this.features);
    }
}
