import { Component } from '@angular/core';

/**
 * @title Sticky Columns Table
 */
@Component({
    selector: 'table-sticky-example',
    templateUrl: './table-sticky-example.html',
    styleUrls: ['./table-sticky-example.css'],
})
export class TableStickyExampleComponent {
    stickyColumn = 'first';
    tableElements = [
        {
            product: 'Car',
            contractNumber: 1234,
            desc: 'this is a contract',
            website: 'www.example.com',
            endingAt: '1/3/2020',
            status: 'negative',
            statusText: 'open',
        },
        {
            product: 'Health',
            contractNumber: 2423,
            desc: 'this is another contract',
            website: 'www.aposin.org',
            endingAt: '4/2/2020',
            status: 'active',
            statusText: 'accepted',
        },
        {
            product: 'Car',
            contractNumber: 353455,
            desc: 'Lorem ipsum dolor sit amet, csis libero. ',
            website: 'www.example.com',
            endingAt: '6/2/2020',
            status: 'positive',
            statusText: 'accepted',
        },
        {
            product: 'Home',
            contractNumber: 22344,
            desc: 'this is a description of a contract',
            website: 'www.example.org',
            endingAt: '1/2/2027',
            status: 'critical',
            statusText: 'rejected',
        },
    ];
}
