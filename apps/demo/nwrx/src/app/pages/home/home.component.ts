import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'nwrx-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
    constructor() {}

    public ngOnInit(): void {}
}
