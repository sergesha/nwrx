import { TestBed } from '@angular/core/testing';

import { STORE_INTERNAL_FEATURE_MANAGER_SERVICE_TOKEN } from '../models/store.tokens';

import { FeatureManagerService } from './feature-manager.service';
import { StoreService } from './store.service';

describe('StoreService', () => {
    let service: StoreService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                FeatureManagerService,
                StoreService,
                { provide: STORE_INTERNAL_FEATURE_MANAGER_SERVICE_TOKEN, useValue: null },
            ],
        });
        service = TestBed.inject(StoreService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
