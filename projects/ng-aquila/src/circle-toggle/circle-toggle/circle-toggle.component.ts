import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostListener,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { NxCircleToggleGroupComponent } from '../circle-toggle-group/circle-toggle-group.component';
import { NxMobileToggleButtonComponent } from '../mobile-toggle-button/mobile-toggle-button.component';
import { ToggleButton } from './toggle-button';

export class ToggleChangeEvent {
    /** A toggle button */
    button: ToggleButton;

    /** The value of the toggle button that is sent with the event. */
    value: string;

    constructor(button: ToggleButton, value: string) {
        this.button = button;
        this.value = value;
    }
}

let nextId = 0;

@Component({
    selector: 'nx-circle-toggle',
    templateUrl: 'circle-toggle.component.html',
    styleUrls: ['circle-toggle.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: ToggleButton,
            useExisting: forwardRef(() => NxCircleToggleComponent),
        },
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NxCircleToggleComponent),
            multi: true,
        },
    ],
    host: {
        '[class.nx-toggle-circle]': 'true',
        '[class.in-group]': 'inGroup',
        '[class.is-disabled]': 'disabled',
        '[class.is-responsive]': 'responsive',
    },
})
export class NxCircleToggleComponent extends ToggleButton implements OnInit, OnDestroy, AfterViewInit, ControlValueAccessor {
    private _id = `toggle-button-${nextId++}`;

    @ViewChild('input') _nativeInput!: ElementRef<HTMLElement>;

    /** @docs-private */
    inGroup = false;

    /**
     * Id of the circle toggle.
     *
     * If not set, the circle toggle gets an incremented value by default.
     */
    set id(value: string) {
        this._id = value;
        this._cdr.markForCheck();
    }
    get id(): string {
        return this._id;
    }

    private _name: string | null = null;

    /** Name that is used for accessibility. */
    @Input()
    set name(value: string) {
        this._name = value;
        this._cdr.markForCheck();
    }
    get name(): string {
        return this._name as string;
    }

    /**
     * An event that is emitted when the checked state fo the circle toggle changes.
     */
    @Output()
    checkedChange = new EventEmitter<boolean>();

    /**
     * An event that is emitted when the checked state of the circle toggle changes.
     * The event object contains the circle toggle itself and its value (see ToggleChangeEvent).
     */
    @Output()
    selectionChange = new EventEmitter<ToggleChangeEvent>();

    _checked = false;
    /** Whether the circle toggle is checked. */
    @Input()
    set checked(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (this.checked !== newValue) {
            this._checked = newValue;
            this._cdr.markForCheck();
        }
    }
    get checked(): boolean {
        return this._checked;
    }

    private _value: string | null = null;

    /** The value that is used in the model. */
    @Input()
    set value(newValue: string) {
        this._value = newValue;
        this._cdr.markForCheck();
    }
    get value(): string {
        return this._value as string;
    }

    private _iconName: string | null = null;
    /** Id of the icon that should be displayed. */
    @Input('icon')
    set iconName(name: string) {
        this._iconName = name;
        this._cdr.markForCheck();
    }
    get iconName(): string {
        return this._iconName as string;
    }

    private _svg: string | null = null;

    /** SVG that is displayed if the circle toggle is unchecked. */
    @Input()
    set svg(src: string) {
        this._svg = src;
        this._cdr.markForCheck();
    }
    get svg(): string {
        return this._svg as string;
    }

    private _svgChecked: string | null = null;

    /** SVG that is displayed if the circle toggle is checked. */
    @Input()
    set svgChecked(src: string) {
        this._svgChecked = src;
        this._cdr.markForCheck();
    }
    get svgChecked(): string {
        return this._svgChecked as string;
    }

    private _circleText: string | null = null;

    /** A text that is displayed inside the circle toggle. */
    @Input()
    set circleText(value: string) {
        if (value !== this._circleText) {
            this._circleText = value;
            this._cdr.markForCheck();
        }
    }
    get circleText(): string {
        return this._circleText as string;
    }

    private _label: string | null = null;

    /** Label displayed below the circle. */
    @Input()
    set label(value: string) {
        this._label = value;
        this._cdr.markForCheck();
    }
    get label(): string {
        return this._label as string;
    }

    private _hint: string | null = null;

    /** Additional hint displayed below the label. */
    @Input()
    set hint(value: string) {
        this._hint = value;
        this._cdr.markForCheck();
    }
    get hint(): string {
        return this._hint as string;
    }

    private _negative: boolean | undefined;

    /** Whether the circle toggle uses the negative set of styling. */
    @Input()
    set negative(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (this.negative !== newValue) {
            this._negative = newValue;
            this._cdr.markForCheck();
        }
    }

    get negative(): boolean {
        return !!this._negative;
    }

    private _responsive: boolean | undefined;

    /** Whether the circle toggle has a responsive behavior. */
    @Input()
    set responsive(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (this.responsive !== newValue) {
            this._responsive = newValue;
            this._cdr.markForCheck();
        }
    }

    get responsive(): boolean {
        return !!this._responsive;
    }

    private _disabled: boolean | undefined;

    /** Whether the circle toggle is disabled. */
    @Input()
    set disabled(value: BooleanInput) {
        const newValue = coerceBooleanProperty(value);
        if (this.disabled !== newValue) {
            this._disabled = newValue;
            this._cdr.markForCheck();
        }
    }

    get disabled(): boolean {
        return !!this._disabled;
    }

    /** @docs-private */
    @ViewChild(NxMobileToggleButtonComponent, { static: true })
    toggleButton!: NxMobileToggleButtonComponent;

    private _hover = false;

    /** touched is set to true on touch devices. */
    _touched = false;

    /** @docs-private */
    @HostListener('mouseenter') onMouseEnter() {
        if (!this._touched) {
            this._hover = true;
        }
    }

    /** @docs-private */
    @HostListener('mouseleave') onMouseLeave() {
        if (!this._touched) {
            this._hover = false;
        }
    }

    /** @docs-private */
    @HostListener('touchstart') onTouchStart() {
        this._touched = true;
    }

    _removeUniqueSelectionListener: () => void = () => {};

    private onChangeCallback = (checked: boolean) => {};
    private onTouchedCallback = () => {};

    constructor(
        /** @docs-private */ @Optional() public toggleGroup: NxCircleToggleGroupComponent,
        private _checkedDispatcher: UniqueSelectionDispatcher,
        private _cdr: ChangeDetectorRef,
        private _focusMonitor: FocusMonitor,
    ) {
        super();

        if (this.toggleGroup) {
            this.name = this.toggleGroup.name;
        }
    }

    ngOnInit() {
        if (this.toggleGroup) {
            this.attachListenerForGroup();
        }
    }

    ngAfterViewInit() {
        if (this.toggleGroup) {
            Promise.resolve().then(() => {
                this.inGroup = true;
                this.negative = this.toggleGroup.negative;
                this.disabled = this.toggleGroup.disabled;
                this.responsive = this.toggleGroup.responsive;
                this.id = this.toggleGroup.id + `-button-${nextId++}`;
            });
        }

        this._focusMonitor.monitor(this._nativeInput);
    }

    ngOnDestroy() {
        // function returned by the listener
        this._removeUniqueSelectionListener();
        this._focusMonitor.stopMonitoring(this._nativeInput);
    }

    /** @docs-private */
    attachListenerForGroup() {
        this._removeUniqueSelectionListener = this._checkedDispatcher.listen((groupId: string, buttonId: string) => {
            if (this.id !== buttonId && groupId === this.toggleGroup.id) {
                this.checked = false;
            }
        });
    }

    writeValue(newValue: boolean): void {
        this.checked = newValue;
    }

    registerOnChange(fn: any): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouchedCallback = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /** Focuses the radio button element. */
    focus(focusOrigin?: FocusOrigin) {
        this._focusMonitor.focusVia(this._nativeInput, focusOrigin as FocusOrigin);
    }

    /** @docs-private */
    toggle(event: Event) {
        event.preventDefault();
        event.stopPropagation();

        // TODO simplify if statement
        if (!((this.toggleGroup && this.checked) || this.disabled)) {
            this.checked = !this.checked;
            this.onChangeCallback(this.checked);
            this.checkedChange.emit(this.checked);
            this.selectionChange.emit(new ToggleChangeEvent(this, this.value));
            if (this.toggleGroup) {
                this._checkedDispatcher.notify(this.toggleGroup.id, this.id);
            }
        }
    }

    /**
     * @docs-private
     *
     * method called by the group if the internal value of the group is changed programatically,
     * does not trigger change emission
     */
    setGroupSelection() {
        // propagate changes only if the value in the group is different than the button checked value
        if (!this.checked) {
            this.checked = !this.checked;
            this.onChangeCallback(this.checked);
            this._checkedDispatcher.notify(this.toggleGroup.id, this.id);
        }
    }

    /** @docs-private */
    get svgButton(): boolean {
        return !!this.svg && !!this.svgChecked;
    }

    /** @docs-private */
    get svgUrl(): string {
        let useFilledSvg = this.checked || (!this.disabled && this._hover);
        if (this.negative) {
            useFilledSvg = !useFilledSvg;
        }
        return useFilledSvg ? this.svgChecked : this.svg;
    }

    /** @docs-private */
    get type() {
        return this.toggleGroup ? 'radio' : 'checkbox';
    }

    /** @docs-private */
    handleEnterKey(event: Event) {
        if (!this.toggleGroup) {
            this.toggle(event);
        }
    }
}
