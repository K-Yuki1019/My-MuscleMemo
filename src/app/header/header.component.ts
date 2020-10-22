import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from '../dialogs/create-dialog/create-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$: Observable<User> = this.authService.user$;

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {}

  login() {
    return this.authService.login();
  }

  logout() {
    return this.authService.logout();
  }

  openCreateDialog() {
    this.dialog.open(CreateDialogComponent, {
      maxWidth: '100vh',
      minWidth: '30%',
      autoFocus: false,
    });
  }
}
