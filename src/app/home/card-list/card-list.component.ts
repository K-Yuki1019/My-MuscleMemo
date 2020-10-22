import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { Observable } from 'rxjs';
import { Note } from 'src/app/interfaces/note';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  notes$: Observable<Note[]> = this.noteService.getNotesWithUsers();
  user$: Observable<User> = this.authService.user$;

  constructor(
    private noteService: NoteService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
}
