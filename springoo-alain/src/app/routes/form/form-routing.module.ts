import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormListComponent } from './list/list.component';

const routes: Routes = [

  { path: 'list', component: FormListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
