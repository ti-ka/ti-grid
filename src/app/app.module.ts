import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// From Npm:
// import { TiGridModule } from 'ti-grid';
import { TiWorkflowModule } from '../../projects/ti-workflow/src/lib/ti-workflow.module';

// From Local Project
import { TiGridModule } from '../../projects/ti-grid/src/lib/ti-grid.module';
import { TiModalModule } from 'projects/ti-modal/src/public_api';
import { RouterModule } from '@angular/router';
import { WorkflowComponent } from '../../projects/ti-workflow/src/lib/components/workflow/workflow.component';
import { TiGridComponent } from '../../projects/ti-grid/src/lib/ti-grid.component';
import { ConfirmComponent} from '../../projects/ti-modal/src/lib/confirm/confirm.component';
import {SignaturePadModule} from "../../projects/signature-pad/src/lib/signature-pad.module";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        CommonModule,
        TiGridModule,
        TiWorkflowModule,
        TiModalModule,
        SignaturePadModule,
        RouterModule.forRoot([
            { path: 'ng-workflow', component: WorkflowComponent, },
            { path: 'ti-grid', component: TiGridComponent }
        ])
    ],
    exports: [
    ],
    providers: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
