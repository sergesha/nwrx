import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { ImmutableStorePageComponent } from './pages/immutable-store-page/immutable-store-page.component';
import { IntercomPageComponent } from './pages/intercom-page/intercom-page.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
    },
    {
        path: 'intercom',
        component: IntercomPageComponent,
    },
    {
        path: 'immutable-store',
        component: ImmutableStorePageComponent,
    },
    {
        path: '**',
        redirectTo: '',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
