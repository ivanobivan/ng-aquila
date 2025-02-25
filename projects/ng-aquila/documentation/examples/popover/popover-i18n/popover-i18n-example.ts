import { Component, Injectable } from '@angular/core';
import { NxPopoverIntl } from '@aposin/ng-aquila/popover';

@Injectable()
export class MyPopoverIntl extends NxPopoverIntl {
    closeIconLabel = 'Schließen';
}

/** @title Popover Internationalization */
@Component({
    templateUrl: 'popover-i18n-example.html',
    selector: 'phone-input-i18n-example',
    providers: [
        {
            provide: NxPopoverIntl,
            useClass: MyPopoverIntl,
        },
    ],
})
export class PopoverI18nExampleComponent {}
