import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { MypageComponent } from './mypage/mypage.component';
import { NoteComponent } from './note/note.component';

const routes: Routes = [
  {
    path: '',
    component: MypageComponent,
    children: [
      {
        path: 'note',
        component: NoteComponent,
      },
      {
        path: 'chart',
        component: ChartComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MypageRoutingModule {}
