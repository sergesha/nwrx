import { ModuleWithProviders, NgModule } from '@angular/core';

import { IntercomOptions, IntercomService, INTERCOM_SERVICE_DEFAULT_OPTIONS_TOKEN } from './intercom.service';

export { IntercomOptions, IntercomData, IntercomService } from './intercom.service';

@NgModule({
    providers: [],
})
export class IntercomModule {
    public static forRoot(defaultOptions?: IntercomOptions): ModuleWithProviders<IntercomModule> {
        return {
            ngModule: IntercomModule,
            providers: [IntercomService, { provide: INTERCOM_SERVICE_DEFAULT_OPTIONS_TOKEN, useValue: defaultOptions }],
        };
    }
}
