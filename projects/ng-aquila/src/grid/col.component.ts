import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit } from '@angular/core';
import { mapClassNames } from '@aposin/ng-aquila/utils';

import { addStylesFromDimensions, isEmptyArray, processSplit, validateClassInElement } from './utils';

const MAPPING = {
    '': 'nx-grid__column-',
    xs: 'nx-grid__column-',
    sm: 'nx-grid__column-small-',
    md: 'nx-grid__column-medium-',
    lg: 'nx-grid__column-large-',
    xlg: 'nx-grid__column-xlarge-',
    '2xlg': 'nx-grid__column-2xlarge-',
    '3xlg': 'nx-grid__column-3xlarge-',
};

const MAPPING_ALIGN_SELF = {
    auto: 'nx-align-self-{tier}-auto',
    start: 'nx-align-self-{tier}-start',
    end: 'nx-align-self-{tier}-end',
    center: 'nx-align-self-{tier}-center',
    baseline: 'nx-align-self-{tier}-baseline',
    stretch: 'nx-align-self-{tier}-stretch',
};

const MAPPING_ORDER = {
    first: 'nx-flex-{tier}-first',
    last: 'nx-flex-{tier}-last',
    unordered: 'nx-flex-{tier}-unordered',
};

const OFFSET_MAPPING = {
    '': 'nx-grid--offset-',
    xs: 'nx-grid--offset-',
    sm: 'nx-grid--offset-small-',
    md: 'nx-grid--offset-medium-',
    lg: 'nx-grid--offset-large-',
    xlg: 'nx-grid--offset-xlarge-',
    '2xlg': 'nx-grid--offset-2xlarge-',
    '3xlg': 'nx-grid--offset-3xlarge-',
};

const MIN = 0;
const MAX = 12;

/** Type for the available alignment values of a column inside the flexible container. */
export type ColSelfAlignment = 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch';

/** Type for the available values for setting the order of a column within a row. */
export type ColOrder = 'first' | 'last' | 'unordered';

@Component({
    selector: '[nxCol]',
    template: '<ng-content></ng-content>',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['col.component.scss'],
    host: {
        '[class]': '_classNames',
    },
})
export class NxColComponent implements OnInit {
    private _columnClasses = '';
    private _offsetClasses = '';
    private _alignSelfClasses = '';
    private _orderClasses = '';

    get _classNames() {
        return [this._columnClasses, this._offsetClasses, this._alignSelfClasses, this._orderClasses, this.class].filter(classes => classes?.length).join(' ');
    }

    /**
     * Number of columns used.
     *
     * Values: 1 - 12, default value: 12.
     */
    @Input('nxCol')
    set col(value: string) {
        this._columnClasses = this._mapTiers(value, [], MAPPING, ['0']);

        if (this._columnClasses.length === 0) {
            this.generateError('Exception: NxColDirective. Empty nxCol attribute.');
        }
    }

    /**
     * The number of columns the column should be offset.
     *
     * Values: 1 - 12, default value: 12.
     */
    @Input('nxColOffset')
    set offset(value: string) {
        this._offsetClasses = this._mapTiers(value, [], OFFSET_MAPPING);
    }

    /** The alignment for a column inside the flexible container. */
    @Input('nxAlignSelf')
    set itemSelf(value: ColSelfAlignment | string) {
        /** Values: auto, start, end, center, baseline, stretch */
        this._alignSelfClasses = value ? addStylesFromDimensions(value, MAPPING_ALIGN_SELF) : '';
    }

    /** Order of the column within the row. */
    @Input('nxColOrder')
    set order(value: ColOrder | string) {
        /** Values: first, last or unordered */
        this._orderClasses = value ? addStylesFromDimensions(value, MAPPING_ORDER) : '';
    }

    /**
     * Overwrite default class property to access user provided class.
     * @docs-private
     */
    @Input()
    class!: string;

    constructor(private el: ElementRef) {}

    ngOnInit() {
        if (!validateClassInElement(this.el.nativeElement.parentElement, 'nxRow')) {
            this.generateError("Exception: NxColDirective. nxRow don't exist");
        }
    }

    private _mapTiers(input: string, defaults?: any[], mapping?: object, exclude?: string[]): string {
        const givenTiers = processSplit(input);
        let mappedClasses: string[] = [];
        if (input && !isEmptyArray(givenTiers) && this.checkNotAllowedValues(givenTiers, exclude!)) {
            switch (givenTiers.length) {
                case 1:
                    this.validateInput(givenTiers);
                    mappedClasses = [mapClassNames('', defaults, mapping) + givenTiers[0]];
                    break;
                case 2:
                    this.validateInput(givenTiers);
                    mappedClasses = [
                        mapClassNames('xs', defaults, mapping) + givenTiers[0],
                        mapClassNames('sm', defaults, mapping) + givenTiers[1],
                        mapClassNames('md', defaults, mapping) + givenTiers[1],
                        mapClassNames('lg', defaults, mapping) + givenTiers[1],
                        mapClassNames('xlg', defaults, mapping) + givenTiers[1],
                        mapClassNames('2xlg', defaults, mapping) + givenTiers[1],
                        mapClassNames('3xlg', defaults, mapping) + givenTiers[1],
                    ];
                    break;
                case 3:
                    this.validateInput(givenTiers);
                    mappedClasses = [
                        mapClassNames('xs', defaults, mapping) + givenTiers[0],
                        mapClassNames('sm', defaults, mapping) + givenTiers[1],
                        mapClassNames('md', defaults, mapping) + givenTiers[2],
                        mapClassNames('lg', defaults, mapping) + givenTiers[2],
                        mapClassNames('xlg', defaults, mapping) + givenTiers[2],
                        mapClassNames('2xlg', defaults, mapping) + givenTiers[2],
                        mapClassNames('3xlg', defaults, mapping) + givenTiers[2],
                    ];
                    break;
                case 4:
                    this.validateInput(givenTiers);
                    mappedClasses = [
                        mapClassNames('xs', defaults, mapping) + givenTiers[0],
                        mapClassNames('sm', defaults, mapping) + givenTiers[1],
                        mapClassNames('md', defaults, mapping) + givenTiers[2],
                        mapClassNames('lg', defaults, mapping) + givenTiers[3],
                        mapClassNames('xlg', defaults, mapping) + givenTiers[3],
                        mapClassNames('2xlg', defaults, mapping) + givenTiers[3],
                        mapClassNames('3xlg', defaults, mapping) + givenTiers[3],
                    ];
                    break;
                case 5:
                    this.validateInput(givenTiers);
                    mappedClasses = [
                        mapClassNames('xs', defaults, mapping) + givenTiers[0],
                        mapClassNames('sm', defaults, mapping) + givenTiers[1],
                        mapClassNames('md', defaults, mapping) + givenTiers[2],
                        mapClassNames('lg', defaults, mapping) + givenTiers[3],
                        mapClassNames('xlg', defaults, mapping) + givenTiers[4],
                        mapClassNames('2xlg', defaults, mapping) + givenTiers[4],
                        mapClassNames('3xlg', defaults, mapping) + givenTiers[4],
                    ];
                    break;
                case 6:
                    this.validateInput(givenTiers);
                    mappedClasses = [
                        mapClassNames('xs', defaults, mapping) + givenTiers[0],
                        mapClassNames('sm', defaults, mapping) + givenTiers[1],
                        mapClassNames('md', defaults, mapping) + givenTiers[2],
                        mapClassNames('lg', defaults, mapping) + givenTiers[3],
                        mapClassNames('xlg', defaults, mapping) + givenTiers[4],
                        mapClassNames('2xlg', defaults, mapping) + givenTiers[5],
                        mapClassNames('3xlg', defaults, mapping) + givenTiers[5],
                    ];
                    break;
                case 7:
                    this.validateInput(givenTiers);
                    mappedClasses = [
                        mapClassNames('xs', defaults, mapping) + givenTiers[0],
                        mapClassNames('sm', defaults, mapping) + givenTiers[1],
                        mapClassNames('md', defaults, mapping) + givenTiers[2],
                        mapClassNames('lg', defaults, mapping) + givenTiers[3],
                        mapClassNames('xlg', defaults, mapping) + givenTiers[4],
                        mapClassNames('2xlg', defaults, mapping) + givenTiers[5],
                        mapClassNames('3xlg', defaults, mapping) + givenTiers[6],
                    ];
                    break;
                default:
                    mappedClasses = [mapClassNames('', defaults, mapping) + '12'];
                    break;
            }
        }

        return mappedClasses.join(' ');
    }

    /** @docs-private */
    isValueBetween(min: number, max: number, value: string): boolean {
        try {
            const parsed = parseInt(value, 10);
            return max >= parsed && min <= parsed;
        } catch (error) {
            this.generateError('Exception: NxColDirective. One argument is not number');
            return false;
        }
    }

    /** @docs-private */
    checkNotAllowedValues(values: string[], excludes: string[]): boolean {
        if (!excludes) {
            return true;
        }
        const found = values.find(val => excludes.includes(val));
        if (found) {
            this.generateError(`Exception: NxColDirective. Incorrect parameter. ${found} is not allowed here`);
        }
        return !found;
    }

    /** @docs-private */
    generateError(err: string) {
        throw new Error(err);
    }

    /** @docs-private */
    validateInput(value: string[]) {
        value.forEach(element => {
            if (!this.isValueBetween(MIN, MAX, element)) {
                this.generateError(`Exception: NxColDirective. Incorrect parameters, values must be between ${MIN} and ${MAX}`);
            }
        });
    }
}
