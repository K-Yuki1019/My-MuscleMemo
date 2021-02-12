import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Note, NoteWithUser } from 'src/app/interfaces/note';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';
import * as faker from 'faker/locale/ja';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
})
export class PostDetailComponent implements OnInit {
  noteId: string;
  user$: Observable<User> = this.authService.user$;

  fakeNoteWithUser$ = new Array(1).fill(null).map(() => {
    return {
      createdAt: faker.date.recent(),
      weight: faker.random.number({ min: 40, max: 100 }),
      bodyFatPer: faker.random.number({ min: 4, max: 30 }),
      text: faker.lorem.words(50),
      todayMenu: faker.lorem.word(1),
      trainingWeight: faker.random.number({ min: 5, max: 50 }),
      rep: faker.random.number({ min: 5, max: 50 }),
      uid: faker.random.uuid(),
      userName: faker.name.findName(),
      avatarUrl: faker.image.image(),
      height: faker.random.objectElement([160, 170, 180, 199]),
      gender: faker.name.gender(['man', 'woman', 'other']),
      bodyImage: faker.image.imageUrl(),
      likedCount: faker.random.number(50),
    };
  });

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
