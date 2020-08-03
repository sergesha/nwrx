import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'nwrx-sidenav',
    templateUrl: './sidenav.component.html',
    styleUrls: ['./sidenav.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit {
    public links: { name: string; path: string }[] = [
        { name: 'Home', path: '' },
        { name: 'ngx-intercom', path: 'intercom' },
        { name: 'ngx-immutable-store', path: 'immutable-store' },
    ];
    constructor() {}

    public ngOnInit(): void {}
}
