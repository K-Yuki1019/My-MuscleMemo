import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { NoteWithUser } from 'src/app/interfaces/note';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { NoteService } from 'src/app/services/note.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss'],
})
export class MypageComponent implements OnInit {
  activatedTab = 'note';
  userTabContents = [
    { path: 'note', label: '投稿一覧' },
    { path: 'chart', label: '記録' },
  ];

  user$: Observable<User>;
  userId: string;

  // noteWithUser$: Observable<NoteWithUser> = this.route.paramMap.pipe(
  //   switchMap((param) => {
  //     const id = param.get('noteId');
  //     return this.noteService.getNoteWithUserByNoteId(id);
  //   })
  // );

  userId$: Observable<string> = this.authService.user$.pipe(
    map((user) => {
      return user.uid;
    })
  );

  profileId$: Observable<string> = this.route.paramMap.pipe(
    map((param) => {
      return param.get('id');
    })
  );

  isMypage$: Observable<boolean> = combineLatest([
    this.userId$,
    this.profileId$,
  ]).pipe(map(([userId, profileId]) => userId === profileId));

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public authService: AuthService,
    private snackBar: MatSnackBar,
    private noteService: NoteService
  ) {}

  updateAvatar(event) {
    if (event.target.files.length) {
      const image = event.target.files[0];
      this.userService.updateAvatar(this.userId, image).then(() => {
        this.snackBar.open('画像をアップロードしました！', null, {
          duration: 2000,
        });
      });
    }
  }

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap((param) => {
        const id = param.get('id');
        this.userId = param.get('id');
        return this.userService.getUser(id);
      })
    );
  }
}
