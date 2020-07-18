import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NxModule } from '@nrwl/angular';

import { IntercomModule } from '@nwrx/common/ngx-intercom';

import { AppComponent } from './app.component';
import { ReaderComponent } from './reader.component';
import { SourceComponent } from './source.component';

@NgModule({
    declarations: [AppComponent, SourceComponent, ReaderComponent],
    imports: [
        BrowserModule,
        NxModule.forRoot(),
        IntercomModule.forRoot({
            forceUpdate: true,
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
