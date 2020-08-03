import { NgModule } from '@angular/core';

import {
    storeFeatureFactory,
    ImmutableStoreFeatureModule,
    IImmutableStoreFeature,
    STORE_FEATURE_TOKEN,
} from '@nwrx/common/ngx-immutable-store';

import { RandomStoreModel } from './random-store.model';

export function randomStoreFeatureFactory(): IImmutableStoreFeature {
    return storeFeatureFactory('random', new RandomStoreModel());
}

@NgModule({
    declarations: [],
    imports: [ImmutableStoreFeatureModule],
    providers: [
        {
            provide: STORE_FEATURE_TOKEN,
            multi: true,
            useFactory: randomStoreFeatureFactory,
        },
    ],
})
export class RandomStoreModule {}
