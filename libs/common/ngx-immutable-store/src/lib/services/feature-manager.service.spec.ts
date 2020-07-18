import { TestBed } from '@angular/core/testing';

import { STORE_INTERNAL_FEATURE_MAP_TOKEN } from '../models/store.tokens';

import { FeatureManagerService } from './feature-manager.service';

describe('FeatureManagerService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [FeatureManagerService, { provide: STORE_INTERNAL_FEATURE_MAP_TOKEN, useValue: {} }],
        })
    );

    it('should be created', () => {
        const service: FeatureManagerService = TestBed.inject(FeatureManagerService);
        expect(service).toBeTruthy();
    });
});
