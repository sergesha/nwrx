import { Component, OnInit } from '@angular/core';

import { IntercomService } from '@nwrx/common/ngx-intercom';

@Component({
    selector: 'app-source',
    templateUrl: './source.component.html',
    styleUrls: ['./source.component.scss'],
})
export class SourceComponent implements OnInit {
    public testMessage;

    constructor(private intercom: IntercomService) {}

    public ngOnInit() {
        let counter = 1;
        setInterval(() => {
            this.testMessage = `Test Message-${counter++}`;
            this.intercom.push('testMessage', this.testMessage);
        }, 1000);

        this.intercom.push('something', 'something');

        setTimeout(() => {
            this.intercom.push('and-other-messages', 'and-other-messages');
        }, 3000);
    }
}
