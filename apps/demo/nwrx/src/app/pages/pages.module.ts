import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../modules/material/material.module';

import { HomeComponent } from './home/home.component';
import { ImmutableStorePageModule } from './immutable-store-page/immutable-store-page.module';
import { IntercomPageComponent } from './intercom-page/intercom-page.component';

@NgModule({
    declarations: [IntercomPageComponent, HomeComponent],
    imports: [CommonModule, MaterialModule, ImmutableStorePageModule],
})
export class PagesModule {}
