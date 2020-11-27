import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.auth.user$.pipe(
      map((user) => !!user),
      tap((isLoggedin) => {
        if (!isLoggedin) {
          this.snackBar.open('『記録を始める』を押してください！', null, {
            duration: 2000,
          });
          this.router.navigateByUrl('/welcome');
        }
      })
    );
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user$.pipe(
      map((user) => !!user),
      take(1),
      tap((isLoggedin) => {
        if (!isLoggedin) {
          this.snackBar.open('『記録を始める』を押してください！', null, {
            duration: 2000,
          });
          this.router.navigateByUrl('/welcome');
        }
      })
    );
  }
}
