import { NgModule } from '@angular/core';
import { NxDropdownModule } from '@aposin/ng-aquila/dropdown';
import { NxFormfieldModule } from '@aposin/ng-aquila/formfield';
import { ExamplesSharedModule } from '../examples-shared.module';
import { DropdownCustomLabelExampleComponent } from './dropdown-custom-label/dropdown-custom-label-example';
import { DropdownDisabledItemsExampleComponent } from './dropdown-disabled-items/dropdown-disabled-items-example';
import { DropdownFilterCustomExampleComponent } from './dropdown-filter-custom/dropdown-filter-custom-example';
import { DropdownFilterExampleComponent } from './dropdown-filter/dropdown-filter-example';
import { DropdownGroupExampleComponent } from './dropdown-group/dropdown-group-example';
import { DropdownLazyExampleComponent } from './dropdown-lazy/dropdown-lazy-example';
import { DropdownMultiSelectExampleComponent } from './dropdown-multi-select/dropdown-multi-select-example';
import { DropdownNegativeExampleComponent } from './dropdown-negative/dropdown-negative-example';
import { DropdownOutlineExampleComponent } from './dropdown-outline/dropdown-outline-example';
import { DropdownPlaceholderExampleComponent } from './dropdown-placeholder/dropdown-placeholder-example';
import { DropdownReactiveExampleComponent } from './dropdown-reactive/dropdown-reactive-example';
import { DropdownRenderingItemsExampleComponent } from './dropdown-rendering-items/dropdown-rendering-items-example';
import { DropdownSimpleBindingExampleComponent } from './dropdown-simple-binding/dropdown-simple-binding-example';
import { DropdownStandardExampleComponent } from './dropdown-standard/dropdown-standard-example';
import { DropdownTemplateDrivenExampleComponent } from './dropdown-template-driven/dropdown-template-driven-example';
import { MultiSelectExampleComponent } from './multi-select/multi-select-example';

const EXAMPLES = [
    DropdownCustomLabelExampleComponent,
    DropdownDisabledItemsExampleComponent,
    DropdownFilterExampleComponent,
    DropdownFilterCustomExampleComponent,
    DropdownGroupExampleComponent,
    DropdownMultiSelectExampleComponent,
    DropdownNegativeExampleComponent,
    DropdownOutlineExampleComponent,
    DropdownPlaceholderExampleComponent,
    DropdownReactiveExampleComponent,
    DropdownRenderingItemsExampleComponent,
    DropdownSimpleBindingExampleComponent,
    DropdownStandardExampleComponent,
    DropdownTemplateDrivenExampleComponent,
    DropdownLazyExampleComponent,
    MultiSelectExampleComponent,
];

@NgModule({
    imports: [NxDropdownModule, NxFormfieldModule, ExamplesSharedModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class DropdownExamplesModule {
    static components() {
        return {
            'dropdown-custom-label': DropdownCustomLabelExampleComponent,
            'dropdown-disabled-items': DropdownDisabledItemsExampleComponent,
            'dropdown-filter': DropdownFilterExampleComponent,
            'dropdown-filter-custom': DropdownFilterCustomExampleComponent,
            'dropdown-group': DropdownGroupExampleComponent,
            'dropdown-multi-select': DropdownMultiSelectExampleComponent,
            'dropdown-negative': DropdownNegativeExampleComponent,
            'dropdown-outline': DropdownOutlineExampleComponent,
            'dropdown-placeholder': DropdownPlaceholderExampleComponent,
            'dropdown-reactive': DropdownReactiveExampleComponent,
            'dropdown-rendering-items': DropdownRenderingItemsExampleComponent,
            'dropdown-simple-binding': DropdownSimpleBindingExampleComponent,
            'dropdown-standard': DropdownStandardExampleComponent,
            'dropdown-template-driven': DropdownTemplateDrivenExampleComponent,
            'dropdown-lazy': DropdownLazyExampleComponent,
            'multi-select': MultiSelectExampleComponent,
        };
    }
}
