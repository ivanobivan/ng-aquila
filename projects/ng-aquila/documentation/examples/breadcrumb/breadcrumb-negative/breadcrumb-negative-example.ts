import { Component } from '@angular/core';

/**
 * @title Negative styling example
 */
@Component({
    selector: 'breadcrumb-negative-example',
    templateUrl: './breadcrumb-negative-example.html',
    styleUrls: ['./breadcrumb-negative-example.css'],
})
export class BreadcrumbNegativeExampleComponent {
    items = ['Home', 'Insurance', 'Health Insurance'];

    dynamicItems = this.items;

    goToItem(i: number) {
        this.dynamicItems = this.items.slice(0, i + 1);
    }
}
