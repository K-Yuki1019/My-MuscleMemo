import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedCardComponent } from './shared-card/shared-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SharedCardComponent],
  imports: [CommonModule, RouterModule],
  exports: [SharedCardComponent],
})
export class SharedCardModule {}
