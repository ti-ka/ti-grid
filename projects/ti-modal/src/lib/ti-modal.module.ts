import { NgModule } from '@angular/core';
import { ModalsComponent } from './modal/modals.component';
import { CommonModule } from '@angular/common';
import { DynamicContentComponent } from './core/dynamic-content.component';
import { ClickStopPropagationDirective } from './core/click-stop-propagaton.directive';
import { ToastsComponent } from './toast/toasts.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot([
            { path: 'ng-plus-confirm', component: ConfirmComponent },
        ])
    ],
    declarations: [
        ClickStopPropagationDirective,
        DynamicContentComponent,
        ModalsComponent,
        ToastsComponent,
        ConfirmComponent,
    ],
    exports: [
        ModalsComponent,
        ToastsComponent,
        ConfirmComponent,
    ]
})
export class TiModalModule { }
