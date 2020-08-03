import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'nwrx-intercom-page',
    templateUrl: './intercom-page.component.html',
    styleUrls: ['./intercom-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntercomPageComponent implements OnInit {
    constructor() {}

    public ngOnInit(): void {}
}
