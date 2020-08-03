import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MaterialModule } from '../material/material.module';

@NgModule({
    declarations: [],
    exports: [BrowserTestingModule, NoopAnimationsModule, RouterTestingModule, MaterialModule],
})
export class TestModule {}
