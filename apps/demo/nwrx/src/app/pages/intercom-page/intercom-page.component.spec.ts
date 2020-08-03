import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntercomPageComponent } from './intercom-page.component';

describe('IntercomComponent', () => {
    let component: IntercomPageComponent;
    let fixture: ComponentFixture<IntercomPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IntercomPageComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(IntercomPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
