import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteWithUser } from 'src/app/interfaces/note';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-shared-card',
  templateUrl: './shared-card.component.html',
  styleUrls: ['./shared-card.component.scss'],
})
export class SharedCardComponent implements OnInit {
  @Input() note: NoteWithUser;

  user$ = this.authService.user$;

  constructor(
    private authService: AuthService,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {}
}
