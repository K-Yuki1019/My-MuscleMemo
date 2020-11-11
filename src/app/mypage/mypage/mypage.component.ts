import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mypage',
  templateUrl: './mypage.component.html',
  styleUrls: ['./mypage.component.scss'],
})
export class MypageComponent implements OnInit {
  user$: Observable<User>;
  uid: string;
  childData: any;

  routerLinks = [];
  currentRoute = '';
  activeLinkIndex = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.routerLinks = [
      { label: 'プロフィール', link: 'profile' },
      { label: '投稿一覧', link: 'note' },
      { label: '体型記録一覧', link: 'body-history' },
    ];
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.route.parent.paramMap.subscribe((map) => {
      this.uid = map.get('id');
    });
    this.user$ = this.userService.getUser(this.uid);
    console.log(this.uid);
  }

  onRecieve(eventData) {
    this.childData = eventData;
  }
}
