import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FormRoutingModule } from './form-routing.module';
import { FormListComponent } from './list/list.component';

const COMPONENTS = [
  FormListComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    FormRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class FormModule { }
