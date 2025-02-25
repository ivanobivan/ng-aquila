import { Component } from '@angular/core';

/**
 * @title Expert variation
 */
@Component({
    templateUrl: 'phone-input-expert-example.html',
    styleUrls: ['./phone-input-expert-example.css'],
    selector: 'phone-input-expert-example',
})
export class PhoneInputExpertExampleComponent {
    tel = '+1 123 867593';
    countryCode = 'FR';
    readonly = false;
    disabled = false;

    ngOnInit() {
        setTimeout(() => (this.countryCode = 'AT'));
    }
}
