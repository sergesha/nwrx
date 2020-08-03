import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'nwrx-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
    public title: string = 'NWrx Demo: services, helpers, etc.';

    constructor() {}

    public ngOnInit(): void {}
}
