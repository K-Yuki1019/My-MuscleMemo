import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-shared-card',
  templateUrl: './shared-card.component.html',
  styleUrls: ['./shared-card.component.scss'],
})
export class SharedCardComponent implements OnInit {
  user$ = this.authService.user$;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}
