import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, InjectionToken, Input, Optional } from '@angular/core';
import { Subject } from 'rxjs';

let nextId = 0;

export interface LabelDefaultOptions {
    /** Sets the default appearance. (optional) */
    size?: LABEL_SIZE_TYPE;
}

/** Options for sizing of the label. */
export type LABEL_SIZE_TYPE = 'small' | 'large';
const DEFAULT_SIZE = 'large';

export const LABEL_DEFAULT_OPTIONS = new InjectionToken<LabelDefaultOptions>('LABEL_DEFAULT_OPTIONS');
@Component({
    selector: 'nx-label',
    templateUrl: './label.component.html',
    styleUrls: ['label.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[attr.disabled]': 'disabled',
        '[class.nx-label--negative]': 'negative',
        '[class.nx-label--large]': 'size === "large"',
        '[class.nx-label--small]': 'size === "small"',
    },
})
export class NxLabelComponent {
    readonly _stateChanges = new Subject<void>();
    private _disabled = false;
    private _negative = false;
    private _size: LABEL_SIZE_TYPE | undefined;
    private _for: string | null = null;
    private _id = `nx-label-${nextId++}`;

    /** Sets the label to disabled */
    @Input()
    set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
        this._stateChanges.next();
    }

    get disabled(): boolean {
        return this._disabled;
    }

    /** Sets the label to disabled */
    @Input()
    set negative(value: BooleanInput) {
        this._negative = coerceBooleanProperty(value);
        this._stateChanges.next();
    }

    get negative(): boolean {
        return this._negative;
    }

    /** Sets the Id of the label */
    @Input()
    set id(value: string) {
        this._id = value;
    }

    get id(): string {
        return this._id;
    }

    /**
     * **Expert option**
     * Sets the appearance of the label */
    @Input()
    set size(value: LABEL_SIZE_TYPE) {
        this._size = value;
        this._stateChanges.next();
    }

    get size(): LABEL_SIZE_TYPE {
        return this._size || this._defaultOptions?.size || DEFAULT_SIZE;
    }

    /**
     * Sets the html `for` attribute on the label.
     */
    @Input()
    set for(value: string | null) {
        this._for = value;
        this._cdr.markForCheck();
        this._stateChanges.next();
    }
    get for() {
        return this._for;
    }

    constructor(@Optional() @Inject(LABEL_DEFAULT_OPTIONS) private _defaultOptions: LabelDefaultOptions, private _cdr: ChangeDetectorRef) {}
}
