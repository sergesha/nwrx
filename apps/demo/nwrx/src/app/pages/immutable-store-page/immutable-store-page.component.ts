import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'nwrx-immutable-store-page',
    templateUrl: './immutable-store-page.component.html',
    styleUrls: ['./immutable-store-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImmutableStorePageComponent implements OnInit {
    constructor() {}

    public ngOnInit(): void {}
}
