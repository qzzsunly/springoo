import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BoRoutingModule } from './bo-routing.module';
import { BoEntListComponent } from './ent/list.component';
import { BoDefComponent } from './def/def.component';
import { BoDefEditComponent } from './def/edit/edit.component';
import { BoDefViewComponent } from './def/view/view.component';

const COMPONENTS = [
  BoEntListComponent,
  BoDefComponent];
const COMPONENTS_NOROUNT = [
  BoDefEditComponent,
  BoDefViewComponent];

@NgModule({
  imports: [
    SharedModule,
    BoRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class BoModule { }
