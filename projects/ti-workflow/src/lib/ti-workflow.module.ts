import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { WorkflowComponent } from './components/workflow/workflow.component';
import { NodeComponent } from './components/node/node.component';
import { ConnectorComponent } from './components/connection/connection.component';
import { HtmlPipe } from './pipes/HtmlPipe';
import { SvgLineComponent } from './components/svg-line/svg-line.component';
import { AngularDraggableDirective } from './directive/angular-draggable.directive';
import { StopPropagationDirective } from './directive/stop-propagation.directive';
import { FormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        WorkflowComponent,
        NodeComponent,
        ConnectorComponent,
        HtmlPipe,
        SvgLineComponent,
        AngularDraggableDirective,
        StopPropagationDirective
    ],
    imports: [
        BrowserModule,
        FormsModule,
    ],
    providers: [],
    exports: [
        WorkflowComponent,
    ],
    bootstrap: []
})

export class TiWorkflowModule {
}
