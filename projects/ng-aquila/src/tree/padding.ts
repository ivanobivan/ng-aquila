import { Directionality } from '@angular/cdk/bidi';
import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { CdkTree, CdkTreeNode } from '@angular/cdk/tree';
import { Directive, ElementRef, Input, OnDestroy, Optional, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/** Regex used to split a string on its CSS units. */
const cssUnitPattern = /([%A-Za-z]+)$/;

/**
 * Indent for the children tree dataNodes.
 * This directive will add left-padding to the node to show hierarchy.
 */
@Directive({
    selector: '[nxTreeNodePadding]',
    host: {
        '[class.nx-tree-node--with-padding]': 'true',
    },
})
export class NxTreeNodePaddingDirective<T> implements OnDestroy {
    /** Current padding value applied to the element. Used to avoid unnecessarily hitting the DOM. */
    private _currentPadding!: string | null;

    /** Subject that emits when the component has been destroyed. */
    private _destroyed = new Subject<void>();

    /** CSS units used for the indentation value. */
    indentUnits = 'px';

    /** The level of depth of the tree node. The padding will be `level * indent` pixels. */
    @Input('nxTreeNodePadding')
    get level(): number {
        return this._level;
    }
    set level(value: NumberInput) {
        this._level = coerceNumberProperty(value);
        this._setPadding();
    }
    _level!: number;

    /** The offset is added once on top of each indent. Default number is 0. */
    @Input('nxTreeNodePaddingOffset')
    get offset(): number {
        return this._offset;
    }
    set offset(value: NumberInput) {
        this._offset = coerceNumberProperty(value);
        this._setPadding();
    }
    _offset = 0;

    /**
     * The indent for each level. Can be a number or a CSS string.
     * Default number 24px from material design menu sub-menu spec.
     */
    @Input('nxTreeNodePaddingIndent')
    get indent(): number {
        return this._indent;
    }
    set indent(indent: NumberInput) {
        let value = indent;
        let units = 'px';

        if (typeof indent === 'string') {
            const parts = indent.split(cssUnitPattern);
            value = parts[0];
            units = parts[1] || units;
        }

        this.indentUnits = units;
        this._indent = coerceNumberProperty(value);
        this._setPadding();
    }
    _indent = 24;

    constructor(
        private _treeNode: CdkTreeNode<T>,
        private _tree: CdkTree<T>,
        private _renderer: Renderer2,
        private _element: ElementRef<HTMLElement>,
        @Optional() private _dir: Directionality,
    ) {
        this._setPadding();
        if (this._dir) {
            this._dir.change.pipe(takeUntil(this._destroyed)).subscribe(() => this._setPadding(true));
        }

        // In Ivy the indentation binding might be set before the tree node's data has been added,
        // which means that we'll miss the first render. We have to subscribe to changes in the
        // data to ensure that everything is up to date.
        _treeNode._dataChanges.subscribe(() => this._setPadding());
    }

    ngOnDestroy() {
        this._destroyed.next();
        this._destroyed.complete();
    }

    /** The padding indent value for the tree node. Returns a string with px numbers if not null. */
    _paddingIndent(): string | null {
        const nodeLevel = this._treeNode.data && this._tree.treeControl.getLevel ? this._tree.treeControl.getLevel(this._treeNode.data) : null;
        const level = this._level || nodeLevel;
        return level ? `${level * this._indent + this._offset}${this.indentUnits}` : null;
    }

    _setPadding(forceChange = false) {
        const padding = this._paddingIndent();

        if (padding !== this._currentPadding || forceChange) {
            const element = this._element.nativeElement;
            const paddingProp = this._dir && this._dir.value === 'rtl' ? 'paddingRight' : 'paddingLeft';
            const resetProp = paddingProp === 'paddingLeft' ? 'paddingRight' : 'paddingLeft';
            this._renderer.setStyle(element, paddingProp, padding);
            this._renderer.setStyle(element, resetProp, null);
            this._currentPadding = padding;
        }
    }
}
