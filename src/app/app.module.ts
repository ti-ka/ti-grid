import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

// From Npm:
// import { TiGridModule } from 'ti-grid';
import { TiWorkflowModule } from '../../projects/ti-workflow/src/lib/ti-workflow.module';

// From Local Project
import { TiGridModule } from '../../projects/ti-grid/src/lib/ti-grid.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    TiGridModule,
    TiWorkflowModule,
  ],
  exports: [
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
