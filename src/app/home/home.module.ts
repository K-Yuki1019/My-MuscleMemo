import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './card/card.component';
import { CardListComponent } from './card-list/card-list.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [HomeComponent, CardComponent, CardListComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
  ],
})
export class HomeModule {}
