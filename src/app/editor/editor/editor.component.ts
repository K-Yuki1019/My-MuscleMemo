import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Note } from 'src/app/interfaces/note';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
  isProcessing: boolean;
  isComplete = false;
  user$ = this.authService.user$;
  uid: string;

  form = this.fb.group({
    bodyWeight: ['', [Validators.required]],
    bodyFatPer: ['', [Validators.required]],
    movieUrls: this.fb.array([]),
    todayMenu: this.fb.array([]),
    trainingWeight: ['', [Validators.required]],
    rep: ['', [Validators.required]],
    text: ['', [Validators.required, Validators.maxLength(1000)]],
    finishedTime: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private noteService: NoteService,
    private authService: AuthService,
    private snackBar: MatSnackBar
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

  get todayMenu(): FormArray {
    return this.form.get('todayMenu') as FormArray;
  }

  get trainingWeight(): FormControl {
    return this.form.get('trainingWeight') as FormControl;
  }

  get rep(): FormControl {
    return this.form.get('rep') as FormControl;
  }

  get text(): FormControl {
    return this.form.get('text') as FormControl;
  }

  get finishedTime(): FormControl {
    return this.form.get('finishedTime') as FormControl;
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

  addTodayMenu() {
    const menuFormGroup = this.fb.group({
      todayMenu: ['', [Validators.required]],
    });
    this.movieUrls.push(menuFormGroup);
  }

  removeTodayMenu(menuIndex: number) {
    this.movieUrls.removeAt(menuIndex);
  }

  submit(userId: string) {
    const value = this.form.value;
    const formData: Omit<Note, 'noteId' | 'createdAt'> = {
      text: value.text,
      todayMenu: value.todayMenu,
      weight: value.weight,
      height: value.height,
      bodyFatPer: value.bodyFatPer,
      movieUrl: value.movieUrl,
      trainingWeight: value.trainingWeight,
      rep: value.rep,
      userId,
    };
    this.noteService
      .createNote(formData)
      .then(() =>
        this.snackBar.open('投稿しました！', null, {
          duration: 2000,
        })
      )
      .then(() => {
        this.isComplete = true;
        this.isProcessing = false;
      });
  }
  ngOnInit(): void {}
}
