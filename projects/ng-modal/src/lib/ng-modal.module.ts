import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ModalsComponent } from './modal/modals.component';
import { FormsModule } from '@angular/forms';
import { DynamicContentComponent } from './core/dynamic-content.component';
import { ToastsComponent } from './toast/toasts.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { ClickStopPropagationDirective } from './core/click-stop-propagaton.directive';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ClickStopPropagationDirective,
    DynamicContentComponent,
    ModalsComponent,
    ToastsComponent,
    ConfirmComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '__ng-modal__', component: ModalsComponent },
      { path: '__ng-confirm__', component: ConfirmComponent }
    ])
  ],
  exports: [
    ModalsComponent,
    ToastsComponent,
    ConfirmComponent,
  ],
  providers: [
  ]
})

export class NgModalModule { }
