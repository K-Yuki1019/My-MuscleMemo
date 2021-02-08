import { Location } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { firestore } from 'firebase';
import { Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { MenuGroup } from 'src/app/interfaces/menu-group';
import { Note } from 'src/app/interfaces/note';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  user$ = this.authService.user$;

  private noteId$: Observable<string> = this.route.paramMap.pipe(
    map((params) => {
      return params.get('noteId');
    })
  );

  private note$ = this.noteId$.pipe(
    switchMap((id) => {
      return id ? this.noteService.getNote(id) : of(null);
    })
  );

  inProgress = false;
  isComplete = false;

  noteId: string;
  uid: string;
  bodyImageUrl: string | ArrayBuffer;
  movieUrl: string[] = [];
  file: File;
  note: Note;
  user: User;

  readonly maxTextLength = 1000;
  readonly maxUrlLength = 400;

  menuGroup: MenuGroup[] = [
    {
      part: '腕',
      menu: [{ value: '腕立て伏せ' }, { value: 'ダンベルカール' }],
    },
    {
      part: '腹筋',
      menu: [{ value: 'アブローラー' }, { value: 'ドラゴンレッグ' }],
    },
    {
      part: '脚',
      menu: [{ value: 'スクワット' }, { value: 'レッグカール' }],
    },
  ];

  form = this.fb.group({
    bodyWeight: ['', [Validators.required]],
    bodyFatPer: [''],
    movieUrls: this.fb.array([]),
    trainings: this.fb.array([]),
    bodyImageUrl: [''],
    text: ['', [Validators.required, Validators.maxLength(1000)]],
    isPublic: [true],
  });

  constructor(
    private fb: FormBuilder,
    private noteService: NoteService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFirestore
  ) {}

  get bodyWeight(): FormControl {
    return this.form.get('bodyWeight') as FormControl;
  }

  get bodyFatPer(): FormControl {
    return this.form.get('bodyFatPer') as FormControl;
  }

  get movieUrls(): FormArray {
    return this.form.get('movieUrls') as FormArray;
  }
  get trainings(): FormArray {
    return this.form.get('trainings') as FormArray;
  }

  get todayMenu(): FormControl {
    return this.form.get('todayMenu') as FormControl;
  }

  get trainingWeight(): FormControl {
    return this.form.get('trainingWeight') as FormControl;
  }

  get rep(): FormControl {
    return this.form.get('rep') as FormControl;
  }

  get bodyImageUrlControl(): FormControl {
    return this.form.get('bodyImageUrl') as FormControl;
  }

  get text(): FormControl {
    return this.form.get('text') as FormControl;
  }

  get isPublic(): FormControl {
    return this.form.get('isPublic') as FormControl;
  }

  addTrainings() {
    const trainingGroup = this.fb.group({
      todayMenu: [''],
      trainingWeight: [''],
      rep: [''],
    });
    this.trainings.push(trainingGroup);
  }

  removeTrainings(trainingIndex: number) {
    this.trainings.removeAt(trainingIndex);
  }

  addMovieUrl() {
    const movieFormGroup = this.fb.group({
      movieUrl: [
        '',
        [
          Validators.pattern(
            '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
          ),
        ],
      ],
    });
    this.movieUrls.push(movieFormGroup);
  }

  removeMovieUrl(movieIndex: number) {
    this.movieUrls.removeAt(movieIndex);
  }

  convertToImageUrl(file: File) {
    const reader = new FileReader();
    reader.onload = (event) => {
      this.bodyImageUrl = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  setImage({ target }: { target: HTMLInputElement }) {
    if (target.files.length) {
      (this.file = target.files[0]), this.convertToImageUrl(this.file);
    }
  }

  cancel() {
    this.location.back();
  }

  getUserData() {
    this.authService.user$
      .pipe(take(1))
      .toPromise()
      .then((user) => {
        this.user = user;
      });
  }

  getNoteAndPatchValue() {
    this.note$
      .pipe(take(1))
      .toPromise()
      .then((note: Note) => {
        if (note) {
          this.noteId = note.noteId;
          this.movieUrl = note.movieUrl;
          this.form.patchValue({
            weight: note.weight,
            bodyFatPer: note.bodyFatPer,
            trainings: note.trainings,
            text: note.text,
            isPublic: note.isPublic,
            bodyImageUrl: note.bodyImageUrl,
          });
        }
      });
  }

  submit() {
    this.inProgress = true;
    const value = this.form.value;
    console.log(value);
    const formData: Omit<Note, 'createdAt' | 'updateAt' | 'noteId'> = {
      userId: this.user.uid,
      isPublic: value.isPublic,
      weight: value.bodyWeight,
      bodyFatPer: value.bodyFatPer,
      trainings: value.trainings,
      movieUrl: value.movieUrls,
      bodyImageUrl: value.bodyImageUrl,
      text: value.text,
    };
    console.log(value);
    console.log(formData);
    this.isComplete = true;

    const messgae = value.isPublic
      ? '投稿が完了しました！'
      : '下書きを保存しました！';
    console.log(formData);
    if (this.noteId) {
      this.noteService
        .updateNote(this.noteId, formData)
        .then(() => {
          this.succeededSubmit(messgae);
        })
        .catch((error) => {
          this.failedSubmit(error);
        });
    } else {
      this.noteId = this.db.createId();
      this.noteService
        .createNote(formData)
        .then(() => {
          this.succeededSubmit(messgae);
        })
        .catch((error) => {
          this.failedSubmit(error);
        });
    }
  }

  succeededSubmit(message: string) {
    this.router.navigateByUrl('/');
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  failedSubmit(error: { message: any }) {
    console.error(error.message);
    this.snackBar.open(
      '投稿エラーです。数秒後にもう一度お試しください。',
      '閉じる'
    );
  }

  ngOnInit(): void {
    this.getUserData();
    this.getNoteAndPatchValue();
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.form.dirty) {
      $event.preventDefault();
      $event.returnValue = '作業中の内容が失われますが、よろしいですか？';
    }
  }
}
