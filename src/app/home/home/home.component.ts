import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { NoteWithUser } from 'src/app/interfaces/note';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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
