import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmutableStorePageComponent } from './immutable-store-page.component';

describe('ImmutableStoreComponent', () => {
    let component: ImmutableStorePageComponent;
    let fixture: ComponentFixture<ImmutableStorePageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ImmutableStorePageComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ImmutableStorePageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
