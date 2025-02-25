import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxIndicatorModule } from '@aposin/ng-aquila/indicator';
import { LazyLoadedModule } from '../../lazy-loaded-module';
import { AnchorButtonExampleComponent } from './anchor-button/anchor-button-example';
import { ButtonBlockExampleComponent } from './button-block/button-block-example';
import { ButtonDangerExampleComponent } from './button-danger/button-danger-example';
import { ButtonIconIndicatorExampleComponent } from './button-icon-indicator/button-icon-indicator-example';
import { ButtonIconExampleComponent } from './button-icon/button-icon-example';
import { ButtonLargeExampleComponent } from './button-large/button-large-example';
import { ButtonMediumExampleComponent } from './button-medium/button-medium-example';
import { ButtonNegativeExampleComponent } from './button-negative/button-negative-example';
import { ButtonPlainExampleComponent } from './button-plain/button-plain-example';
import { ButtonSmallMediumExampleComponent } from './button-small-medium/button-small-medium-example';
import { ButtonSmallExampleComponent } from './button-small/button-small-example';
import { ButtonWithIconExampleComponent } from './button-with-icon/button-with-icon-example';
import { ButtonExampleComponent } from './button/button-example';

const EXAMPLES = [
    ButtonExampleComponent,
    ButtonBlockExampleComponent,
    ButtonDangerExampleComponent,
    ButtonIconExampleComponent,
    ButtonLargeExampleComponent,
    ButtonMediumExampleComponent,
    ButtonNegativeExampleComponent,
    ButtonPlainExampleComponent,
    ButtonSmallExampleComponent,
    ButtonSmallMediumExampleComponent,
    ButtonWithIconExampleComponent,
    ButtonIconIndicatorExampleComponent,
    AnchorButtonExampleComponent,
];

@NgModule({
    imports: [NxButtonModule, CommonModule, NxIconModule, NxIndicatorModule],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class ButtonExamplesModule implements LazyLoadedModule {
    static components() {
        return {
            button: ButtonExampleComponent,
            'button-block': ButtonBlockExampleComponent,
            'button-danger': ButtonDangerExampleComponent,
            'button-icon': ButtonIconExampleComponent,
            'button-large': ButtonLargeExampleComponent,
            'button-medium': ButtonMediumExampleComponent,
            'button-negative': ButtonNegativeExampleComponent,
            'button-plain': ButtonPlainExampleComponent,
            'button-small': ButtonSmallExampleComponent,
            'button-small-medium': ButtonSmallMediumExampleComponent,
            'button-with-icon': ButtonWithIconExampleComponent,
            'button-icon-indicator': ButtonIconIndicatorExampleComponent,
            'anchor-button': AnchorButtonExampleComponent,
        };
    }
}
