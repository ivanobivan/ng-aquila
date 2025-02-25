import { FocusMonitor } from '@angular/cdk/a11y';
import { BooleanInput, coerceBooleanProperty, coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { DOWN_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    DoCheck,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    Self,
    TemplateRef,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { ControlValueAccessor, FormControl, FormGroupDirective, NgControl, NgForm, ValidatorFn } from '@angular/forms';
import { NxErrorComponent, NxLabelComponent } from '@aposin/ng-aquila/base';
import { ErrorStateMatcher } from '@aposin/ng-aquila/utils';
import { Subject, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { NxFileUploader } from './file-uploader';
import { FileItem } from './file-uploader.model';
import { isFileTypeValid, NxFileUploaderValidators } from './file-uploader.validations';
import { NxFileUploaderButtonDirective } from './file-uploader-button.directive';
import { NxFileUploaderDropZoneComponent } from './file-uploader-drop-zone.component';
import { NxFileUploaderHintDirective } from './file-uploader-hint.directive';
import { NxFileUploaderIntl } from './file-uploader-intl';

let nextId = 0;

@Component({
    selector: 'nx-file-uploader',
    templateUrl: './file-uploader.component.html',
    exportAs: 'NxFileUploaderComponent',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./file-uploader.component.scss'],
    host: {
        '[attr.aria-invalid]': 'errorState',
        '[class.has-error]': 'errorState',
    },
})
export class NxFileUploaderComponent implements ControlValueAccessor, AfterContentInit, OnChanges, OnDestroy, DoCheck, OnInit, AfterViewInit {
    /** @docs-private */
    @ContentChild(NxFileUploaderButtonDirective, { static: false }) button!: NxFileUploaderButtonDirective;

    /** @docs-private */
    @ContentChild(NxFileUploaderDropZoneComponent, { static: true }) _dropZone!: NxFileUploaderDropZoneComponent;

    /** @docs-private */
    @ViewChild('nativeInputFile', { static: false }) nativeInputFile!: ElementRef;

    /** @docs-private */
    @ContentChild(NxLabelComponent, { static: false }) _label!: NxLabelComponent;

    /** @docs-private */
    @ContentChildren(NxFileUploaderHintDirective) _hintChildren!: QueryList<NxFileUploaderHintDirective>;

    /** @docs-private */
    @ContentChildren(NxErrorComponent) _errorList!: QueryList<NxErrorComponent>;

    @ViewChildren('fileRowElement') _fileRowElements!: QueryList<ElementRef>;

    /** Preserves the current value of the _fileRowElements ViewChildren in case _fileRowElements changes. */
    private _fileRowElementsPrevious!: QueryList<ElementRef>;

    private _subscriptions: Subscription[] = [];
    private _filesSubscriptions: Subscription[] = [];

    /** An event emitted when queue is changed.
     *
     * Emits the changed array of FileItems.
     * @docs-private */
    @Output() valueChange = new EventEmitter<FileItem[]>();

    /** An event emitted when a file is deleted from the queue
     *
     * Emits the deleted FileItem.
     */
    @Output() fileDeleted = new EventEmitter<FileItem>();

    /**
     * An event emitted when one or more files were added to the file input.
     *
     * Emits the selected FileItem | FileItem[]
     */
    @Output() filesSelected = new EventEmitter<FileItem[]>();

    private _id = `nx-file-uploader-${nextId++}`;
    private _name!: string;
    private _value!: FileItem[] | null;
    private _maxFileSize = 0;
    private _required = false;
    private _disabled = false;
    private _multiple = false;
    private _accept!: string;
    private _controlValidators: ValidatorFn | null = null;
    private _uploader!: NxFileUploader;
    private _maxFileNumber: number | null = null;
    _inputId = `${this.id}-input`;
    _labelId = `${this.id}-label`;
    _itemTemplate!: TemplateRef<any>;
    _templateContext;

    /** @docs-private */
    errorState = false;

    /** @docs-private */
    stateChanges = new Subject<void>();

    /** @docs-private */
    validatorFnArray: any[] = [];

    private _intlChanges!: Subscription;

    /** Sets the id of the file uploader. */
    @Input()
    set id(value: string) {
        this._id = value;
        this._cdr.markForCheck();
    }
    get id(): string {
        return this._id;
    }

    /** Whether the file uploader is required. */
    @Input()
    set required(value: BooleanInput) {
        this._required = coerceBooleanProperty(value);
    }
    get required(): boolean {
        return this._required;
    }

    /** The value of the file upload. */
    @Input()
    set value(value: FileItem[] | undefined) {
        this.writeValue(value as FileItem[]);
    }
    get value(): FileItem[] | undefined {
        return this._value as FileItem[];
    }

    /** Name that is used for accessibility. */
    @Input()
    set name(value: string) {
        this._name = value;
    }
    get name(): string {
        return this._name;
    }

    /** Whether the file uploader is disabled. */
    @Input()
    set disabled(value: BooleanInput) {
        this._disabled = coerceBooleanProperty(value);
        if (this.button) {
            this.button.disabled = this._disabled;
        }

        if (this._dropZone) {
            this._dropZone.disabled = this._disabled;
        }

        this._cdr.markForCheck();
    }
    get disabled(): boolean {
        return this._disabled;
    }

    /** Whether the file uploader accepts multiple files to be added. */
    @Input()
    set multiple(value: BooleanInput) {
        this._multiple = coerceBooleanProperty(value);
    }
    get multiple(): boolean {
        return this._multiple;
    }

    /** The accepted file types */
    @Input()
    set accept(value: string) {
        this._accept = value;
    }
    get accept(): string {
        return this._accept;
    }

    /** The max file size in bytes used for validation */
    @Input()
    set maxFileSize(value: NumberInput) {
        this._maxFileSize = coerceNumberProperty(value);
    }
    get maxFileSize(): number {
        return this._maxFileSize;
    }

    /** Sets the file uploader for the component. */
    @Input()
    set uploader(newUploader: NxFileUploader) {
        if (this._uploader !== newUploader) {
            this._uploader = newUploader;
        }
    }
    get uploader(): NxFileUploader {
        return this._uploader;
    }

    /** The max number of files that is accepted. */
    @Input()
    set maxFileNumber(value: NumberInput) {
        this._maxFileNumber = coerceNumberProperty(value);
    }
    get maxFileNumber(): number {
        return this._maxFileNumber as number;
    }

    /** Sets the template for the file items. */
    @Input()
    set itemTemplate(template: TemplateRef<any>) {
        if (this._itemTemplate !== template) {
            this._itemTemplate = template;
        }
    }
    get itemTemplate(): TemplateRef<any> {
        return this._itemTemplate;
    }

    constructor(
        private _cdr: ChangeDetectorRef,
        private _errorStateMatcher: ErrorStateMatcher,
        public _intl: NxFileUploaderIntl,
        @Optional() private _parentForm: NgForm,
        @Optional() private _parentFormGroup: FormGroupDirective,
        /** @docs-private */ @Optional() @Self() public ngControl: NgControl,
        private _focusMonitor: FocusMonitor,
    ) {
        if (this.ngControl) {
            // Note: we provide the value accessor through here, instead of
            // the `providers` to avoid running into a circular import.
            this.ngControl.valueAccessor = this;
        }

        this._templateContext = this;
    }

    ngOnInit(): void {
        if (this.ngControl?.control) {
            // we need to save the control validators.
            this._controlValidators = this.ngControl.control.validator;
        }

        this._intlChanges = this._intl.changes.subscribe(() => {
            this._cdr.markForCheck();
            this.stateChanges.next();
        });

        this._resetValidators();
    }

    ngAfterViewInit() {
        this._fileRowElements.forEach(row => this._focusMonitor.monitor(row));
        this._fileRowElementsPrevious = this._fileRowElements;
        this._fileRowElements.changes.subscribe(rowElements => {
            this._fileRowElementsPrevious.forEach(row => this._focusMonitor.stopMonitoring(row));
            this._fileRowElementsPrevious = rowElements;
            rowElements.forEach((row: ElementRef) => this._focusMonitor.monitor(row));
        });
    }

    ngOnChanges() {
        this.stateChanges.next();
    }

    ngOnDestroy() {
        this.stateChanges.complete();
        this._intlChanges.unsubscribe();
        this._subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
        this._filesSubscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
        this._fileRowElements.forEach(row => this._focusMonitor.stopMonitoring(row));
    }

    /** @docs-private */
    updateErrorState() {
        const oldState = this.errorState;
        const parent = this._parentFormGroup || this._parentForm;
        const control = this.ngControl ? (this.ngControl.control as FormControl) : null;
        const newState = this._errorStateMatcher.isErrorState(control, parent);

        if (newState !== oldState) {
            this.errorState = newState;
            this.stateChanges.next();
        }
    }

    /** @docs-private */
    onChangeCallback = (_: any) => {};

    /** @docs-private */
    onTouchedCallback = () => {};

    registerOnChange(callback: any): void {
        this.onChangeCallback = callback;
    }

    registerOnTouched(callback: any): void {
        this.onTouchedCallback = callback;
    }

    writeValue(value: FileItem[]) {
        if (this._value !== value) {
            if (value) {
                if (this._filesSubscriptions) {
                    this._filesSubscriptions.forEach((fileSubscription: Subscription) => fileSubscription.unsubscribe());
                    this._filesSubscriptions = [];
                }
            }

            this._resetValidators();
            this._value = value;
            this._subscribeToFileChanges();
        }
    }

    _resetValidators(clear = false) {
        if (this.ngControl?.control) {
            if (clear) {
                this.ngControl.control.clearValidators();
            }

            const validators = this._controlValidators
                ? [this._controlValidators, NxFileUploaderValidators.maxFileNumber(this.value as FileItem[], this.maxFileNumber), ...this.validatorFnArray]
                : [NxFileUploaderValidators.maxFileNumber(this.value as FileItem[], this.maxFileNumber), ...this.validatorFnArray];

            this.ngControl.control.setValidators(validators);
            this.ngControl.control.updateValueAndValidity();
        }
    }

    ngAfterContentInit() {
        let subscription;
        const subscriptions = [];

        subscription = this.button._clicked.subscribe(() => {
            this.nativeInputFile.nativeElement.click();
        });
        subscriptions.push(subscription);

        this.button.disabled = this.disabled;

        if (this._dropZone) {
            subscription = this._dropZone.fileDropped.subscribe(files => {
                this._addFilesToQueue(files);
            });
            subscriptions.push(subscription);

            this._dropZone.disabled = this.disabled;
        }

        if (this._label) {
            this._label.for = this._inputId;
            this._label.id = this._labelId;
        }

        subscription = this.stateChanges.subscribe(() => {
            this._syncDescribedByIds();
            this._cdr.markForCheck();
        });
        subscriptions.push(subscription);

        // Re-validate when the number of hints changes.
        subscription = this._hintChildren.changes.pipe(startWith(null)).subscribe(() => {
            this._syncDescribedByIds();
            this._cdr.markForCheck();
        });
        subscriptions.push(subscription);

        // Re-validate when the number of hints changes.
        subscription = this._errorList.changes.pipe(startWith(null)).subscribe(() => {
            this._syncDescribedByIds();
            this._cdr.markForCheck();
        });
        subscriptions.push(subscription);

        this._subscriptions = subscriptions;
    }

    _addFilesToQueue(files: File[]) {
        if (!this.multiple) {
            this.value = [];
        }

        this._setFileListFromValue(files);
        this._resetValidators(true);

        this.onChangeCallback(this.value);
        this.onTouchedCallback();
        this.valueChange.emit(this.value);
        this.filesSelected.emit(this.value);
    }

    _setFileListFromValue(files: File[]) {
        // we need to set max file size errors to false
        this.validatorFnArray = [];
        if (files === null) {
            this.value = undefined;
        } else {
            files.forEach((file: File) => {
                if (this.isValidOnSelection(file)) {
                    const tmp = new FileItem(file);
                    if (this.value) {
                        this.value.push(tmp);
                    } else {
                        this.value = [tmp];
                    }
                    this._cdr.markForCheck();
                }
            });
            this._subscribeToFileChanges();
        }
    }

    /** Removes a file from the value list of the file upload input. */
    removeFile(file: any) {
        this.value = this.value!.filter(item => file !== item);

        if (this._filesSubscriptions) {
            this._filesSubscriptions.forEach((fileSubscription: Subscription) => fileSubscription.unsubscribe());
            this._filesSubscriptions = [];
        }

        this._subscribeToFileChanges();

        this.validatorFnArray = []; // bugfix: kick invalid type error on file remove
        this._resetValidators(true);
        this._cdr.markForCheck();

        this.valueChange.emit(this.value);
        this.fileDeleted.emit(file);
        this.onTouchedCallback();
        this.onChangeCallback(this.value);

        // resets the value of the file input, so that if a file is deleted and added again. otherwise there is no change detected
        this.nativeInputFile.nativeElement.value = '';
    }

    /** Uploads the files via the defined uploader. */
    uploadFiles() {
        if (!this.uploader) {
            console.warn('No uploader found. Please define a NxFileUpload to use the uploading mechanism.');
            return;
        }

        if (this.uploader) {
            this.uploader.uploadFiles(this.value as FileItem[]);
        }
    }

    ngDoCheck() {
        if (this.ngControl) {
            // We need to re-evaluate this on every change detection cycle, because there are some
            // error triggers that we can't subscribe to (e.g. parent form submissions). This means
            // that whatever logic is in here has to be super lean or we risk destroying the performance.
            this.updateErrorState();
        }
    }

    private isValidOnSelection(file: File) {
        let isValid = false;

        this.validatorFnArray.push(NxFileUploaderValidators.maxFileSize(this.maxFileSize, file));
        this.validatorFnArray.push(NxFileUploaderValidators.fileType(file, this.accept));

        if ((!this.maxFileSize || file.size <= this.maxFileSize) && isFileTypeValid(file, this.accept)) {
            isValid = true;
        }

        return isValid;
    }

    /**
     * @docs-private
     * The label for the uploading state used in the queue.
     */
    get uploadingLabel(): string {
        return this._intl.uploadingLabel;
    }

    /**
     * @docs-private
     * The label for the uploading state used in the queue.
     */
    get deleteLabel(): string {
        return this._intl.deleteLabel;
    }

    /**
     * @docs-private
     * The label for the uploading state used in the queue.
     */
    get uploadedLabel(): string {
        return this._intl.uploadedStateLabel;
    }

    /**
     * Sets the list of element IDs that describe the child control. This allows the trigger element (button) to update
     * its `aria-describedby` attribute accordingly.
     */
    private _syncDescribedByIds() {
        let ids: string[] = [];
        ids = this._hintChildren.map(hint => hint.id);
        ids = [this._label.id, ...ids];
        ids = [...this._errorList.map(error => error.id), ...ids];
        this.button.setDescribedByIds(ids);
    }

    _handleKeydownListRow(event: KeyboardEvent) {
        if (event.keyCode === DOWN_ARROW) {
            const nextFileItemRow = (event.target as HTMLElement).nextSibling as HTMLElement;
            if (nextFileItemRow?.classList?.contains('nx-file-uploader--file-row')) {
                event.preventDefault();
                nextFileItemRow.focus();
            }
        } else if (event.keyCode === UP_ARROW) {
            const previousFileItemRow = (event.target as HTMLElement).previousSibling as HTMLElement;
            if (previousFileItemRow?.classList?.contains('nx-file-uploader--file-row')) {
                event.preventDefault();
                previousFileItemRow.focus();
            }
        }
    }

    /**
     * Triggered when the input[type=file] is changed
     */
    _onFileChange(event: any) {
        if (this.disabled) {
            return;
        }

        const target = event.target as HTMLInputElement;
        this._addFilesToQueue(Array.from(target.files as FileList));
        this.stateChanges.next();
        this._cdr.markForCheck();
        this.nativeInputFile.nativeElement.value = '';
    }

    /** Listens to changes in each file. */
    _subscribeToFileChanges() {
        if (this.value?.length) {
            let subscription;
            this.value.map(file => {
                subscription = file.onChange.subscribe(() => {
                    this._cdr.markForCheck();
                });
                this._filesSubscriptions.push(subscription);
            });
        }
    }
}
