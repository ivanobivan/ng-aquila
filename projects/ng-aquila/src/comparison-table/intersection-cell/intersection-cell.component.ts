import { Component, Optional, TemplateRef, ViewChild } from '@angular/core';

import { NxComparisonTableBase } from '../comparison-table-base';
import { NxComparisonTableRowBase } from '../comparison-table-row-base';
import { NxToggleSectionBase } from '../toggle-section/toggle-section-base';

@Component({
    selector: 'nx-comparison-table-intersection-cell',
    templateUrl: './intersection-cell.component.html',
})
export class NxComparisonTableIntersectionCell {
    @ViewChild('content', { static: true }) _content!: TemplateRef<any>;

    constructor(public _table: NxComparisonTableBase, public _row: NxComparisonTableRowBase, @Optional() public _toggleSection: NxToggleSectionBase) {}

    _getHeaderIds() {
        // description cell + (toggle section)
        let headers = '';

        if (this._toggleSection) {
            headers += this._toggleSection.toggleSectionHeader.id;
        }

        if (this._row.descriptionCell) {
            headers += ' ' + this._row.descriptionCell.id;
        }

        return headers;
    }

    _getMobileRowspan() {
        return this._table._getPopularCell() ? this._table._infoColumnCount() + 1 : this._table._infoColumnCount();
    }
}
