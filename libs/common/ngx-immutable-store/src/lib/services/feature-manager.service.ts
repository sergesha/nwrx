import { Inject, Injectable } from '@angular/core';

import { TStoreFeatureMap } from '../interfaces/store-feature-map.interface';
import { IStoreFeature } from '../interfaces/store-feature.interface';
import { STORE_INTERNAL_FEATURE_MAP_TOKEN } from '../models/store.tokens';

export function featureManagerServiceFactory(): FeatureManagerService {
    return new FeatureManagerService();
}

@Injectable()
export class FeatureManagerService {
    constructor(@Inject(STORE_INTERNAL_FEATURE_MAP_TOKEN) private storeFeatureMap: TStoreFeatureMap = {}) {}

    public hasFeature(key: string): boolean {
        return !!key && !!this.storeFeatureMap[key];
    }

    public addFeatures(features: IStoreFeature | IStoreFeature[]): void {
        if (features) {
            if (!Array.isArray(features)) {
                features = [features];
            }

            features.map((feature: IStoreFeature) => {
                if (!this.hasFeature(feature.key)) {
                    this.storeFeatureMap = {
                        ...this.storeFeatureMap,
                        [feature.key]: feature,
                    };
                }
            });
        }
    }

    public getFeature(key: string): IStoreFeature | null {
        return this.hasFeature(key) ? this.storeFeatureMap[key] : null;
    }

    public removeFeatures(features: IStoreFeature | IStoreFeature[]): void {
        if (features) {
            if (!Array.isArray(features)) {
                features = [features];
            }

            features.map((feature: IStoreFeature) => {
                if (typeof feature.model?.destroy === 'function') {
                    feature.model.destroy();
                }

                delete this.storeFeatureMap[feature.key];
            });
        }
    }
}
