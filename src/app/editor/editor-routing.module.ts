import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormGuard } from '../guards/form.guard';
import { EditorComponent } from './editor/editor.component';

const routes: Routes = [
  {
    path: ':noteId/edit',
    pathMatch: 'full',
    component: EditorComponent,
    canDeactivate: [FormGuard],
  },
  {
    path: 'create',
    component: EditorComponent,
    canDeactivate: [FormGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorRoutingModule {}
