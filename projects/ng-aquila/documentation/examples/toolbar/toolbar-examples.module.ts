import { NgModule } from '@angular/core';
import { NxButtonModule } from '@aposin/ng-aquila/button';
import { NxContextMenuModule } from '@aposin/ng-aquila/context-menu';
import { NxIconModule } from '@aposin/ng-aquila/icon';
import { NxToolbarModule } from '@aposin/ng-aquila/toolbar';
import { ToolbarPositioningContentExampleComponent } from './toolbar-positioning-content/toolbar-positioning-content-example';
import { ToolbarExampleComponent } from './toolbar/toolbar-example';

const EXAMPLES = [
    ToolbarExampleComponent,
    ToolbarPositioningContentExampleComponent,
];

@NgModule({
    imports: [
        NxToolbarModule,
        NxContextMenuModule,
        NxIconModule,
        NxButtonModule,
    ],
    declarations: [EXAMPLES],
    exports: [EXAMPLES],
})
export class ToolbarExamplesModule {
    static components() {
        return {
            toolbar: ToolbarExampleComponent,
            'toolbar-positioning-content':
                ToolbarPositioningContentExampleComponent,
        };
    }
}
