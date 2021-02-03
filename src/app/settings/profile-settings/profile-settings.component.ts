import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Gender } from 'src/app/interfaces/gender';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  user$: Observable<User> = this.authService.user$;
  readonly userNameMaxLength = 50;
  readonly introductionMaxLength = 500;

  selectGender: string;
  genders: Gender[] = [
    { value: 'man-0', viewValue: '男性' },
    { value: 'woman-1', viewValue: '女性' },
    { value: 'other-3', viewValue: 'その他' },
  ];

  form = this.fb.group({
    userName: ['', [Validators.required, Validators.maxLength(50)]],
    height: new FormControl(),
    introduction: ['', [Validators.maxLength(500)]],
    gender: [0, [Validators.required]],
  });

  heightList: number[] = new Array(61).fill(null).map((_, i) => i + 130);

  get userName(): FormControl {
    return this.form.get('userName') as FormControl;
  }

  get height(): FormControl {
    return this.form.get('height') as FormControl;
  }
  get introduction(): FormControl {
    return this.form.get('introduction') as FormControl;
  }

  get gender(): FormControl {
    return this.form.get('gender') as FormControl;
  }

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  updateProfile(uid: string) {
    const formData = this.form.value;
    const newUserData: Pick<
      User,
      'userName' | 'gender' | 'introduction' | 'height'
    > = {
      userName: formData.userName,
      gender: formData.gender,
      introduction: formData.introduction,
      height: formData.height,
    };
    console.log(newUserData);
    this.userService.updateUser(this.authService.uid, newUserData);
    this.router.navigateByUrl('/mypage' + '/' + uid);
    this.snackBar.open('プロフィールを更新しました！', '閉じる');
  }

  ngOnInit(): void {
    this.user$
      .pipe(take(1))
      .toPromise()
      .then((user: User) => {
        this.form.patchValue({
          userName: user.userName,
          gender: user.gender,
          description: user.introduction,
          height: user.height,
        });
      });
  }
}
