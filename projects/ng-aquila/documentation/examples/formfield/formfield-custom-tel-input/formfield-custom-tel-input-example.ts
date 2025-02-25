import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    Component,
    ElementRef,
    Input,
    OnDestroy,
    Optional,
    Self,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormBuilder,
    FormGroup,
    NgControl,
    Validators,
} from '@angular/forms';
import { NxFormfieldControl } from '@aposin/ng-aquila/formfield';
import { Subject } from 'rxjs';

/**
 * @title Implementing Custom Formfield Control example
 */

/** Data structure for holding telephone number. */
export class MyTel {
    constructor(
        public area: string,
        public exchange: string,
        public subscriber: string,
    ) {}
}

/** Custom `NxFormFieldControl` for telephone number input. */
@Component({
    selector: 'formfield-custom-tel-input-example',
    templateUrl: 'formfield-custom-tel-input-example.html',
    styleUrls: ['formfield-custom-tel-input-example.css'],
    providers: [
        {
            provide: NxFormfieldControl,
            useExisting: FormfieldCustomTelInputExampleComponent,
        },
    ],
    host: {
        '[class.example-floating]': 'shouldLabelFloat',
        '[id]': 'id',
        '[attr.aria-describedby]': 'describedBy',
    },
})
export class FormfieldCustomTelInputExampleComponent
    implements ControlValueAccessor, NxFormfieldControl<MyTel>, OnDestroy
{
    static nextId = 0;
    private _placeholder: string = '';
    private _required = false;
    private _disabled = false;
    readonly!: boolean;
    parts: FormGroup;
    stateChanges = new Subject<void>();
    focused = false;
    errorState = false;
    controlType = 'example-tel-input';
    id = `example-tel-input-${FormfieldCustomTelInputExampleComponent.nextId++}`;
    describedBy = '';
    onChange = (_: any) => {};
    onTouched = () => {};

    get empty() {
        const {
            value: { area, exchange, subscriber },
        } = this.parts;
        return !area && !exchange && !subscriber;
    }

    get shouldLabelFloat() {
        return this.focused || !this.empty;
    }

    @Input()
    get placeholder(): string {
        return this._placeholder;
    }
    set placeholder(value: string) {
        this._placeholder = value;
        this.stateChanges.next();
    }

    @Input()
    get required(): boolean {
        return this._required;
    }
    set required(value: BooleanInput) {
        this._required = coerceBooleanProperty(value);
        this.stateChanges.next();
    }

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
        this._disabled ? this.parts.disable() : this.parts.enable();
        this.stateChanges.next();
    }

    @Input()
    get value(): MyTel | null {
        if (this.parts.valid) {
            const {
                value: { area, exchange, subscriber },
            } = this.parts;
            return new MyTel(area, exchange, subscriber);
        }
        return null;
    }
    set value(tel: MyTel | null) {
        const { area, exchange, subscriber } = tel || new MyTel('', '', '');
        this.parts.setValue({ area, exchange, subscriber });
        this.stateChanges.next();
    }

    constructor(
        formBuilder: FormBuilder,
        private _focusMonitor: FocusMonitor,
        private _elementRef: ElementRef<HTMLElement>,
        @Optional() @Self() public ngControl: NgControl,
    ) {
        this.parts = formBuilder.group({
            area: [
                null,
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(3),
                ],
            ],
            exchange: [
                null,
                [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(3),
                ],
            ],
            subscriber: [
                null,
                [
                    Validators.required,
                    Validators.minLength(4),
                    Validators.maxLength(4),
                ],
            ],
        });

        _focusMonitor.monitor(_elementRef, true).subscribe(origin => {
            if (this.focused && !origin) {
                this.onTouched();
            }
            this.focused = !!origin;
            this.stateChanges.next();
        });

        if (this.ngControl != null) {
            this.ngControl.valueAccessor = this;
        }
    }

    setAriaLabel?(value: string): void {
        throw new Error('Method not implemented.');
    }
    get elementRef(): ElementRef<any> {
        throw new Error('Method not implemented.');
    }

    ngOnDestroy() {
        this.stateChanges.complete();
        this._focusMonitor.stopMonitoring(this._elementRef);
    }

    setDescribedByIds(ids: string[]) {
        this.describedBy = ids.join(' ');
    }

    onContainerClick(event: MouseEvent) {
        if ((event.target as Element).tagName.toLowerCase() !== 'input') {
            this._elementRef.nativeElement.querySelector('input')!.focus();
        }
    }

    writeValue(tel: MyTel | null): void {
        this.value = tel;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    _handleInput(): void {
        this.onChange(this.value);
    }
}
