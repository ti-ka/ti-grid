import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { TiGridComponent } from './ti-grid.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    TiGridComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    TiGridComponent,
  ],
  providers: [
    HttpClient,
  ]
})
export class TiGridModule { }
