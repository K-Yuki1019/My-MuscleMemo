import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor/editor.component';
import { SelectMenuComponent } from './select-menu/select-menu.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: EditorComponent,
  },
  {
    path: 'select-menu',
    component: SelectMenuComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorRoutingModule {}
