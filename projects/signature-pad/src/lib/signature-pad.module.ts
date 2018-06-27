import { NgModule } from '@angular/core';
import { SignaturePadComponent } from './signature-pad.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [SignaturePadComponent],
  exports: [SignaturePadComponent]
})
export class SignaturePadModule { }
