import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FormRoutingModule } from './form-routing.module';
import { FormListComponent } from './list/list.component';
import { FormDefComponent } from './def/def.component';

const COMPONENTS = [
  FormListComponent,
  FormDefComponent];
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
