import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { take, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private auth: UserService, private router: Router) { }

  canActivate(next: any, state: any): Observable<boolean> {
      return this.auth.user$.pipe(
          take(1),
          map(user => !!user),
          tap(loggedIn => {
              if (!loggedIn) {
                  console.log('Access denied');
                  this.router.navigate(['/']);
              }
          })
      );

  }
  
}
