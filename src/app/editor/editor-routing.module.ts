import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormGuard } from '../guards/form.guard';
import { MypageComponent } from '../mypage/mypage/mypage.component';
import { EditorComponent } from './editor/editor.component';
import { SelectMenuComponent } from './select-menu/select-menu.component';

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
