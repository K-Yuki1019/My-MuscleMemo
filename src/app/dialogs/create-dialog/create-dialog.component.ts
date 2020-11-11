import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MenuGroup } from 'src/app/interfaces/menu-group';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from 'src/app/interfaces/note';
import { NoteService } from 'src/app/services/note.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.scss'],
})
export class CreateDialogComponent implements OnInit {
  isProcessing: boolean;
  isComplete = false;
  user$: Observable<User> = this.authService.user$;
  userId: string;

  menuGroups: MenuGroup[] = [
    {
      part: '腕',
      menu: ['ハンマーカール', 'ダンベルカール'],
    },
    {
      part: 'お腹',
      menu: ['アブローラー', 'クランチ', 'プランク'],
    },
    {
      part: '背中',
      menu: ['デッドリフト', '懸垂', 'ダンベルプルオーバー'],
    },
    {
      part: '胸',
      menu: ['ダンベルフライ', '腕立て伏せ', 'チェストプレス'],
    },
    {
      part: '肩',
      menu: ['サイドレイズ', 'アーノルドプレス', 'ショルダープレス'],
    },
    {
      part: '脚',
      menu: ['スクワット', 'バックランジ', 'レッグプレス'],
    },
    {
      part: '有酸素',
      menu: ['ランニング', '縄跳び', 'HIIT'],
    },
  ];

  form = this.fb.group({
    text: ['', [Validators.required, Validators.maxLength(400)]],
    weight: ['', [Validators.required]],
    bodyFatPer: ['', [Validators.required]],
    movieUrl: [
      '',
      [
        Validators.pattern(
          '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
        ),
      ],
    ],
    todayMenu: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private noteService: NoteService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Note
  ) {}

  get text(): FormControl {
    return this.form.get('text') as FormControl;
  }

  get todayMenu(): FormControl {
    return this.form.get('todayMenu') as FormControl;
  }

  get weight(): FormControl {
    return this.form.get('weight') as FormControl;
  }

  get bodyFatPer(): FormControl {
    return this.form.get('bodyFatPer') as FormControl;
  }

  get movieUrl(): FormControl {
    return this.form.get('movieUrl') as FormControl;
  }

  ngOnInit(): void {}

  submit(userId: string) {
    this.isProcessing = true;
    const formData: Omit<Note, 'noteId' | 'createdAt'> = {
      text: this.form.value.text,
      todayMenu: this.form.value.todayMenu,
      weight: this.form.value.weight,
      bodyFatPer: this.form.value.bodyFatPer,
      movieUrl: this.form.value.movieUrl,
      userId,
    };
    this.noteService
      .createNote(formData)
      .then(() =>
        this.snackBar.open('投稿しました', null, {
          duration: 2500,
        })
      )
      .then(() => {
        this.isComplete = true;
        this.isProcessing = false;
      });
  }
}
