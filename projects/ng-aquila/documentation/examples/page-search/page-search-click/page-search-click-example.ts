import { Component } from '@angular/core';

/**
 * @title Button click example
 */
@Component({
    selector: 'page-search-click-example',
    templateUrl: './page-search-click-example.html',
    styleUrls: ['./page-search-click-example.css'],
})
export class PageSearchClickExampleComponent {
    valuesByClick: Array<string> = [];
    searchTerm: string = '';

    onButtonClick(value: string) {
        this.valuesByClick.push(value);
    }
}
