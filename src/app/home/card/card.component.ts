import { Component, OnInit } from '@angular/core';
import { _MatRadioGroupBase } from '@angular/material/radio';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { NoteWithUser } from 'src/app/interfaces/note';
import { NoteService } from 'src/app/services/note.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  user$ = this.authService.user$;

  allLatestNotes$: Observable<
    NoteWithUser[]
  > = this.noteService.getAllNotesWithUsers().pipe(take(1));

  constructor(
    private authService: AuthService,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {}
}
