import { TestBed } from '@angular/core/testing';

import { STORE_INTERNAL_FEATURE_MANAGER_SERVICE_TOKEN } from '../models/store.tokens';

import { FeatureManagerService } from './feature-manager.service';
import { ImmutableStoreService } from './immutable-store.service';

describe('ImmutableStoreService', () => {
    let service: ImmutableStoreService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FeatureManagerService,
                ImmutableStoreService,
                { provide: STORE_INTERNAL_FEATURE_MANAGER_SERVICE_TOKEN, useValue: null },
            ],
        });
        service = TestBed.inject(ImmutableStoreService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
