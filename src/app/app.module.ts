import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// From Npm:
import  { TiGridModule } from 'ti-grid';

// From Local Project
// import { TiGridModule } from '../../projects/ti-grid/src/lib/ti-grid.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    TiGridModule
  ],
  exports: [
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
