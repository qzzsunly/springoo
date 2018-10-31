import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormListComponent } from './list/list.component';
import { FormDefComponent } from './def/def.component';

const routes: Routes = [

  { path: 'list', component: FormListComponent },
  { path: 'def/list', component: FormDefComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
