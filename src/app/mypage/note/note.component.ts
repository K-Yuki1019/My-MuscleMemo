import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Note, NoteWithUser } from 'src/app/interfaces/note';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';
import { User } from '../../interfaces/user';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit {
  user$: Observable<User> = this.authService.user$;
  // notes$: Observable<NoteWithUser[]> = this.noteService.getAllNotesWithUsers();

  notes: Note[] = [];
  isLoding: boolean;
  isComplete: boolean;

  constructor(
    private noteService: NoteService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // console.log(this.notes$);
  }
}
