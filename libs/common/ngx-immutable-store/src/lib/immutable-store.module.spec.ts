import { async, TestBed } from '@angular/core/testing';

import { ImmutableStoreModule } from './immutable-store.module';

describe('NgxImmutableStoreModule', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ImmutableStoreModule],
        }).compileComponents();
    }));

    it('should create', () => {
        expect(ImmutableStoreModule).toBeDefined();
    });
});
