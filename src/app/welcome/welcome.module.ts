import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome/welcome.component';

import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HeroComponent } from './hero/hero.component';
import { HowToCreateComponent } from './how-to-create/how-to-create.component';
import { CatchComponent } from './catch/catch.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    WelcomeComponent,
    HeroComponent,
    HowToCreateComponent,
    CatchComponent,
  ],
  imports: [
    CommonModule,
    WelcomeRoutingModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
})
export class WelcomeModule {}
