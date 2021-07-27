import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedCardComponent } from './shared-card/shared-card.component';

@NgModule({
  declarations: [SharedCardComponent],
  imports: [CommonModule],
  exports: [SharedCardComponent],
})
export class SharedCardModule {}
