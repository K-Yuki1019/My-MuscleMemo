import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
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
    { path: 'body-history', label: '体型記録一覧' },
    { path: 'profile', label: 'プロフィール編集' },
  ];

  user$: Observable<User>;
  userId: string;

  authUid$: Observable<string> = this.authService.user$.pipe(
    map((user) => {
      return user.uid;
    })
  );

  mypageId$: Observable<string> = this.route.paramMap.pipe(
    map((param) => {
      return param.get('id');
    })
  );

  isMypage$: Observable<boolean> = combineLatest([
    this.authUid$,
    this.mypageId$,
  ]).pipe(map(([userId, mypageId]) => userId === mypageId));

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public authService: AuthService,
    private snackBar: MatSnackBar
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
