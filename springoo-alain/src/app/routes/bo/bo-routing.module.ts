import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoEntListComponent } from './ent/list.component';
import { BoDefComponent } from './def/def.component';
import { BoDefEditComponent } from './def/edit/edit.component';
import { BoDefViewComponent } from './def/view/view.component';

const routes: Routes = [

  { path: 'ent/list', component: BoEntListComponent },
  { path: 'def/list', component: BoDefComponent },
  { path: 'def/edit/:id', component: BoDefEditComponent },
  { path: 'def/view/:id', component: BoDefViewComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoRoutingModule { }
