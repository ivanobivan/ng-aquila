import { AfterViewInit, ContentChildren, Directive, QueryList } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, flatMap, map, startWith } from 'rxjs/operators';

import { NxExpandableTableRowComponent } from './expandable-table-row.component';
import { NxExpandable } from './toggle-button.component';

/**
 * The nxExpandableTable adds row expansion functionality to the nxTable.
 * It provides the logic to expand/collapse all expandable rows simultanously.
 */
@Directive({
    selector: 'table[nxExpandableTable]',
    exportAs: 'nxExpandableTable',
})
export class NxExpandableTableDirective implements AfterViewInit, NxExpandable {
    @ContentChildren(NxExpandableTableRowComponent, { descendants: true }) rows!: QueryList<NxExpandableTableRowComponent>;

    expanded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    ngAfterViewInit() {
        this.rows.changes
            .pipe(
                startWith(this.rows),
                flatMap((rows: NxExpandableTableRowComponent[]) => combineLatest(rows.map(row => row.expanded))),
                map((values: boolean[]) => values.reduce((a, x) => a && x, true)),
                distinctUntilChanged(),
            )
            .subscribe(rowsOpen => {
                this.expanded.next(rowsOpen);
            });
    }

    /**
     * Toggles the expandable rows. If all rows are open it will close them, otherwise it will open them.
     */
    toggle() {
        if (this.expanded.value) {
            this.close();
        } else {
            this.expand();
        }
    }

    /**
     * Expands all expandable rows.
     */
    expand() {
        this.rows.forEach(row => row.expanded.next(true));
    }

    /**
     * Closes all expandable rows.
     */
    close() {
        this.rows.forEach(row => row.expanded.next(false));
    }
}
