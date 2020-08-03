import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MaterialModule } from './modules/material/material.module';
import { PagesModule } from './pages/pages.module';

@NgModule({
    declarations: [AppComponent, SidenavComponent, HeaderComponent],
    imports: [BrowserModule, BrowserAnimationsModule, MaterialModule, AppRoutingModule, PagesModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
