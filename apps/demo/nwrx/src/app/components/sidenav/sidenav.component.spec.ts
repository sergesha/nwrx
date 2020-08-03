import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestModule } from '../../modules/test/test.module';

import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
    let component: SidenavComponent;
    let fixture: ComponentFixture<SidenavComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SidenavComponent],
            imports: [TestModule],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SidenavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
