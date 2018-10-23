import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormRoutingModule} from './form.routing';
import {FormListComponent} from './form-list/form-list.component';
import {TableModule} from '../component/table';

@NgModule({
  imports: [
    CommonModule,
    FormRoutingModule,
    TableModule
  ],
  declarations: [FormListComponent]
})
export class FormModule {
}
