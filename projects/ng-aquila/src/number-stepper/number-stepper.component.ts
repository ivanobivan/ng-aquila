import { BooleanInput, coerceBooleanProperty, NumberInput } from '@angular/cdk/coercion';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnDestroy,
    Output,
    Renderer2,
    ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validator } from '@angular/forms';
import { MappedStyles } from '@aposin/ng-aquila/core';
import { mapClassNames, pad } from '@aposin/ng-aquila/utils';
import { Decimal } from 'decimal.js';
import { Subscription } from 'rxjs';

import { NxAutoResizeDirective } from './auto-resize.directive';
import { NxNumberStepperIntl } from './number-stepper-intl';

const SIZE_MAPPING = {
    big: 'nx-stepper--big',
    normal: '',
};
const DEFAULT_CLASSES = ['nx-stepper'];
const INPUT_CLASSES = ['nx-stepper__input'];

const ALLOWED_CHARACTERS = new RegExp(/^-?\d+(\.\d+)?$/g);
const CUSTOM_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NxNumberStepperComponent),
    multi: true,
};
const CUSTOM_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => NxNumberStepperComponent),
    multi: true,
};

let nextUniqueId = 0;

/**
 * `Input('nxSize') classNames` defines the size of the number stepper.
 * Values: big | normal. Default: normal
 */
@Component({
    selector: 'nx-number-stepper',
    templateUrl: 'number-stepper.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['number-stepper.component.scss'],
    inputs: ['classNames: nxSize'],
    host: {
        '[class.is-negative]': 'negative',
        '[class.is-disabled]': 'disabled',
    },
    providers: [CUSTOM_VALUE_ACCESSOR, CUSTOM_VALIDATOR],
})
export class NxNumberStepperComponent extends MappedStyles implements AfterViewInit, ControlValueAccessor, Validator, OnDestroy {
    private _step = 1;
    private _min = 0;
    private _max = 100;
    private _value: number | null = 0;
    private _label!: string;
    private _incrementAriaLabel = '';
    private _decrementAriaLabel = '';
    private _inputAriaLabel = '';
    private _resize = false;
    private _intlSubscription: Subscription;
    private _negative = false;
    private _leadingZero = true;
    private _disabled = false;

    /** @docs-private */
    numberInputValue!: string;

    /** @docs-private */
    inputClassNames: string = mapClassNames('regular', INPUT_CLASSES);

    /** @docs-private */
    inputId = `nx-number-stepper-${nextUniqueId++}`;

    /** @docs-private */
    inputWidth!: number;

    /** @docs-private */
    ariaDescribedBy: string | null = null;

    /** @docs-private */
    @ViewChild('customLabel') ngContentWrapper!: ElementRef;

    /** @docs-private */
    @ViewChild(NxAutoResizeDirective, { static: true }) autoResize!: NxAutoResizeDirective;

    /** @docs-private */
    @ViewChild('nativeInput') nativeInput!: ElementRef;

    /** An event emitted on value change. */
    @Output('nxValueChange') valueChange = new EventEmitter<number>();

    /** Whether the input should be resized. Default: false */
    @Input('nxResize')
    set resize(value: BooleanInput) {
        this._resize = coerceBooleanProperty(value);
        this._cdr.markForCheck();
    }
    get resize(): boolean {
        return this._resize;
    }

    get label(): string {
        return this._label;
    }

    /** Defines the the label shown above the stepper input. */
    @Input('nxLabel')
    set label(value: string) {
        if (this._label !== value) {
            this._label = value;
            this._cdr.markForCheck();
        }
    }

    /** Sets the aria-label for the increment button. */
    @Input()
    set incrementAriaLabel(value: string) {
        this._incrementAriaLabel = value;
    }

    get incrementAriaLabel(): string {
        return this._incrementAriaLabel;
    }

    /** Sets the aria-label for the decrement button. */
    @Input()
    set decrementAriaLabel(value: string) {
        this._decrementAriaLabel = value;
    }

    get decrementAriaLabel(): string {
        return this._decrementAriaLabel;
    }

    /** Sets the aria-label for the input of the number stepper. */
    @Input()
    set inputAriaLabel(value: string) {
        this._inputAriaLabel = value;
    }

    get inputAriaLabel(): string {
        return this._inputAriaLabel;
    }

    /** Sets the step size. Default: 1 */
    @Input('nxStep')
    set step(value: NumberInput) {
        // only internal changes no need to call markForCheck
        this._step = Number(value);
    }

    get step(): number {
        return this._step;
    }

    /** Sets the minimum accepted number. Default: 0 */
    @Input('nxMin')
    set min(value: NumberInput) {
        this._min = Number(value);
    }

    get min(): number {
        return this._min;
    }

    /** Sets the maximum accepted number. Default: 100 */
    @Input('nxMax')
    set max(value: NumberInput) {
        this._max = Number(value);
    }

    get max(): number {
        return this._max;
    }

    get value(): number | null {
        return this._value;
    }

    /** Sets the value of the number-stepper. */
    @Input('nxValue')
    set value(value: number | null) {
        this._value = value as number;
        if (this._value) {
            this.setInputValue(this._value);
        } else {
            this.setInputValue(0);
        }
        this._cdr.markForCheck();
    }

    /** Whether the negative set of styling should be used. */
    @Input()
    set negative(value: BooleanInput) {
        if (this._negative !== value) {
            this._negative = coerceBooleanProperty(value);
            this._cdr.markForCheck();
        }
    }
    get negative(): boolean {
        return this._negative;
    }

    /** Whether the number stepper value should have a leading zero.
     *
     * Default value is true.
     */
    @Input()
    set leadingZero(value: BooleanInput) {
        if (this._leadingZero !== value) {
            this._leadingZero = coerceBooleanProperty(value);
            this.setInputValue(this.value);
            this._cdr.markForCheck();
        }
    }
    get leadingZero(): boolean {
        return this._leadingZero;
    }

    /** Whether the user input in the number stepper should be disabled.
     *
     * Default value is false.
     */
    @Input('nxDisabled')
    set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
    }

    get disabled(): boolean {
        return this._disabled;
    }

    constructor(private _cdr: ChangeDetectorRef, _renderer: Renderer2, _elementRef: ElementRef, public _intl: NxNumberStepperIntl) {
        super(SIZE_MAPPING, _elementRef, _renderer, DEFAULT_CLASSES);
        this._intlSubscription = this._intl.changes.subscribe(() => this._cdr.markForCheck());
    }

    ngAfterViewInit() {
        if (this.ngContentWrapper) {
            this.ariaDescribedBy = this.ngContentWrapper.nativeElement.children.length > 0 ? `label-for-${this.inputId}` : '';
        }
        this.setInputValue(this._value);
    }

    ngOnDestroy() {
        this._intlSubscription.unsubscribe();
    }

    /** @docs-private */
    setInputValue(value: number | null) {
        const parsedValue = value ? value : 0;
        if (this.leadingZero) {
            this.numberInputValue = pad(parsedValue.toString(), 2);
        } else {
            this.numberInputValue = parsedValue.toString();
        }

        if (this.nativeInput) {
            // update the native input value with the transformed value.
            this.nativeInput.nativeElement.value = this.numberInputValue;
        }

        // use timeout to get the current value of numberInputValue
        setTimeout(() => {
            this.triggerResize();
        });
    }

    /* ControlValueAccessor Implementations */
    writeValue(value: number | null): void {
        this.value = value;
    }

    private onChangeCallback: (value: number | null) => void = () => {};

    registerOnChange(onChange: (value: number | null) => void): void {
        this.onChangeCallback = onChange;
    }
    /** @docs-private */
    onTouchedCallback: () => void = () => {};

    registerOnTouched(onTouched: () => void): void {
        this.onTouchedCallback = onTouched;
    }

    /**
     * Disables the stepper. Part of the ControlValueAccessor interface required
     * to integrate with Angular's core forms API.
     *
     * @param isDisabled Sets whether the component is disabled.
     */
    setDisabledState(isDisabled: boolean): void {
        this._disabled = isDisabled;
        this._cdr.markForCheck();
    }

    /** @docs-private */
    onInputChange(event: Event) {
        if (this.validateUserInput((event.target as HTMLInputElement).value)) {
            this._value = Number((event.target as HTMLInputElement).value);
        } else {
            this._value = null;
        }

        // setInputValue() should be called so that numberInputValue is updated with the user input
        if (this._value !== null) {
            this.setInputValue(this._value);
        }

        this.valueChange.emit(this._value!);
        this.onChangeCallback(this._value);
    }

    /** @docs-private */
    validateUserInput(input: string) {
        return !!input.match(ALLOWED_CHARACTERS);
    }

    /** @docs-private */
    incrementOnClick() {
        this._increment();
        this.onTouchedCallback();
    }

    /** @docs-private */
    incrementOnKey(event: Event) {
        this._increment();
        event.preventDefault();
    }

    /** @docs-private */
    _increment() {
        let newValue;
        if (this.isBetweenLimits(this._value || 0)) {
            newValue = this.getNextGreaterValue(this._value || 0);
        } else {
            newValue = this.enforceLimits(this._value || 0);
        }
        this.value = newValue;
        this.setInputValue(this.value);
        this.valueChange.emit(this._value!);
        this.onChangeCallback(this._value);
    }

    /** @docs-private */
    triggerResize() {
        if (this.resize) {
            this.autoResize.updateInputWidth();
            this._cdr.markForCheck();
        }
    }

    /** @docs-private */
    decrementOnClick() {
        this._decrement();
        this.onTouchedCallback();
    }

    /** @docs-private */
    decrementOnKey(event: Event) {
        this._decrement();
        event.preventDefault();
    }

    /** @docs-private */
    _decrement() {
        let newValue;
        if (this.isBetweenLimits(this._value || 0)) {
            newValue = this.getNextLowerValue(this._value || 0);
        } else {
            newValue = this.enforceLimits(this._value || 0);
        }
        this.value = newValue;
        this.setInputValue(this.value);
        this.valueChange.emit(this._value!);
        this.onChangeCallback(this._value);
    }

    /** @docs-private */
    enforceLimits(value: number): number {
        if (value > this._max) {
            return this._max;
        } else if (value < this._min) {
            return this._min;
        }
        return value;
    }

    /** @docs-private */
    getNextLowerValue(start: number): number {
        // if there is an invalid input start is null
        if (!start) {
            start = 0;
        }

        let next: number;
        if (this.isValidStep(start)) {
            next = new Decimal(start).minus(new Decimal(this._step)).toNumber();
        } else {
            next = new Decimal(start).toNearest(this._step, Decimal.ROUND_DOWN).toNumber();
        }
        return this.enforceLimits(next);
    }

    /** @docs-private */
    getNextGreaterValue(start: number) {
        let next;
        if (!start) {
            start = 0;
        }
        if (this.isValidStep(start)) {
            next = new Decimal(start).plus(new Decimal(this._step)).toNumber();
        } else {
            next = new Decimal(start).toNearest(this._step, Decimal.ROUND_UP).toNumber();
        }
        return this.enforceLimits(next);
    }

    /** @docs-private */
    isBetweenLimits(value: number | Decimal) {
        return value <= this._max && value >= this._min;
    }

    /** @docs-private */
    isMinimum() {
        return this._value === this._min;
    }

    /** @docs-private */
    isMaximum() {
        return this._value === this._max;
    }

    /** @docs-private */
    isValidStep(value: number | Decimal | null) {
        if (value === null) {
            value = new Decimal(0);
        }
        const min = new Decimal(this._min);
        const valueDec = new Decimal(value);
        const checkValue = min.minus(valueDec).mod(new Decimal(this._step)).toNumber();

        if (this.isBetweenLimits(value) && (this.isMinimum() || this.isMaximum() || checkValue === 0)) {
            return true;
        }
        return false;
    }

    /** @docs-private */
    userInputToNumber(value: string): number {
        return parseInt(value, 10) || 0;
    }

    _validateFn() {
        // the manual user input must match min + n * step, e.g. minimum 1 step 2: 1, 3, 5, 7 etc.
        if (!this.isValidStep(this._value)) {
            return { nxNumberStepperStepError: 'Value is not a valid step' };
        } else if (this._value === null) {
            return { nxNumberStepperFormatError: 'Not a valid number' };
        }
        return null;
    }

    /** @docs-private */
    validate(c: FormControl) {
        return this._validateFn();
    }

    get _buttonType(): string {
        return 'secondary' + (this.negative ? ' negative' : '');
    }
}
