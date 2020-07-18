import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntercomModule } from '@nwrx/common/ngx-intercom';

import { SourceComponent } from './source.component';

describe('SourceComponent', () => {
    let component: SourceComponent;
    let fixture: ComponentFixture<SourceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SourceComponent],
            imports: [IntercomModule.forRoot()],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SourceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
