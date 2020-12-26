import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Note, NoteWithUser } from 'src/app/interfaces/note';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  noteId: string;
  user$: Observable<User> = this.authService.user$;

  noteId$: Observable<string> = this.route.paramMap.pipe(
    map((param) => {
      return param.get('noteId');
    })
  );

  note$: Observable<NoteWithUser> = this.noteId$.pipe(
    switchMap((id) => {
      return this.noteService.getNoteWithUserByNoteId(id);
    })
  );

  form = this.fb.group({
    comment: [''],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private noteService: NoteService
  ) {
    this.note$.subscribe((note) => {
      console.log(note);
    });
  }

  ngOnInit(): void {}
}
