import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  activatedTab = 'profile';
  userTabContents = [
    { path: 'profile', label: 'プロフィール' },
    { path: 'body-history', label: '体型記録一覧' },
    { path: 'note', label: '投稿一覧' },
  ];

  user$: Observable<User>;

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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap((param) => {
        const id = param.get('id');
        return this.userService.getUser(id);
      })
    );
  }
}
