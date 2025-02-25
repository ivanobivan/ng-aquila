import { Directionality } from '@angular/cdk/bidi';
import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Inject, Input } from '@angular/core';
import { clamp } from '@aposin/ng-aquila/utils';

import { NxProgressStepperDirective } from '../progress-stepper.component';

@Component({
    selector: 'nx-progress-stepper',
    templateUrl: 'progress.component.html',
    styleUrls: ['../progress-stepper.component.scss', './progress.component.scss'],
    providers: [{ provide: NxProgressStepperDirective, useExisting: NxProgressStepperComponent }],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NxProgressStepperComponent extends NxProgressStepperDirective {
    /** Sets the current value/progress of the progress bar. */
    @Input()
    get progress(): number {
        return this._progress;
    }
    set progress(value: number) {
        this._progress = clamp(value || 0);
    }
    private _progress = 0;

    constructor(_cdr: ChangeDetectorRef, _dir: Directionality, _el: ElementRef<HTMLElement>, @Inject(DOCUMENT) _document?: any) {
        super(_cdr, _dir, _el, _document);
    }
}
