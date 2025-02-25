import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { CdkTreeNodeToggle } from '@angular/cdk/tree';
import { Directive, Input } from '@angular/core';

/**
 * Wrapper for the CdkTree's toggle with custom design styles.
 */
@Directive({
    selector: '[nxTreeNodeToggle]',
    providers: [{ provide: CdkTreeNodeToggle, useExisting: NxTreeNodeToggleDirective }],
})
export class NxTreeNodeToggleDirective<T> extends CdkTreeNodeToggle<T> {
    @Input('nxTreeNodeToggleRecursive')
    set recursive(value: boolean) {
        this._recursive = coerceBooleanProperty(value);
    }
    get recursive(): boolean {
        return this._recursive;
    }
}
