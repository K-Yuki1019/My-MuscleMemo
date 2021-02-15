import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DetailCommentComponent } from './detail-comment/detail-comment.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [PostDetailComponent, DetailCommentComponent],
  imports: [
    CommonModule,
    DetailRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatMenuModule,
  ],
})
export class DetailModule {}
