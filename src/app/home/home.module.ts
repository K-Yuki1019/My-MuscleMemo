import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './card/card.component';
import { CardListComponent } from './card-list/card-list.component';


@NgModule({
  declarations: [HomeComponent, CardComponent, CardListComponent],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
