import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ImmutableStoreModule } from '@nwrx/common/ngx-immutable-store';

import { ImmutableStorePageComponent } from './immutable-store-page.component';
import { RandomStoreModule } from './random-store/random-store.module';

@NgModule({
    declarations: [ImmutableStorePageComponent],
    imports: [CommonModule, ImmutableStoreModule.forRoot({ id: 'store' }), RandomStoreModule],
})
export class ImmutableStorePageModule {}
