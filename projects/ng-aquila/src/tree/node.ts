import { FocusableOption, FocusMonitor } from '@angular/cdk/a11y';
import { CdkTree, CdkTreeNode, CdkTreeNodeDef } from '@angular/cdk/tree';
import { Component, ContentChild, Directive, ElementRef, Input, OnDestroy } from '@angular/core';

import { NxTreeNodeActionItem } from './action-item.directive';
import { NxTreeComponent } from './tree.component';

/**
 * Wrapper for the CdkTree node with custom design styles.
 */
@Component({
    selector: 'nx-tree-node',
    exportAs: 'nxTreeNode',
    inputs: ['disabled', 'tabIndex'],
    host: {
        '[attr.aria-expanded]': 'isExpanded',
        '[attr.aria-level]': 'role === "treeitem" ? level : null',
        '[attr.role]': 'role',
        class: 'nx-tree__node',
        '[class.is-expanded]': 'isExpanded',
        '[attr.tabindex]': '-1',
    },
    providers: [{ provide: CdkTreeNode, useExisting: NxTreeNodeComponent }],
    templateUrl: './node.html',
})
export class NxTreeNodeComponent<T> extends CdkTreeNode<T> implements OnDestroy {
    constructor(protected _elementRef: ElementRef<HTMLElement>, protected _tree: CdkTree<T>, protected _focusMonitor: FocusMonitor) {
        super(_elementRef, _tree);
        this._focusMonitor.monitor(this._elementRef.nativeElement);
    }

    @ContentChild(NxTreeNodeActionItem) actionItem!: FocusableOption;

    ngOnDestroy() {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
        super.ngOnDestroy();
    }

    /** Update the focused data in tree keyboard interaction */
    _focus(): void {
        (this._tree as NxTreeComponent<T>).updateFocusedData(this._data);
    }

    focus(): void {
        if (this.actionItem) {
            this.actionItem.focus?.();
        } else {
            this._elementRef.nativeElement.focus();
        }
    }
}

/**
 * Wrapper for the CdkTree node definition with custom design styles.
 */
@Directive({
    selector: '[nxTreeNodeDef]',
    inputs: ['when: nxTreeNodeDefWhen'],
    providers: [{ provide: CdkTreeNodeDef, useExisting: NxTreeNodeDefDirective }],
})
export class NxTreeNodeDefDirective<T> extends CdkTreeNodeDef<T> {
    @Input('nxTreeNode') data!: T;
}
