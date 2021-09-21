import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

import { UserResponse, User, Roles } from '@shared/models/user.interface';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new BehaviorSubject<UserResponse>(null);

  constructor(private http: HttpClient, private router: Router) { }

  get user$(): Observable<UserResponse> {
    return this.user.asObservable();
  }

  get userValue(): UserResponse {
    return this.user.getValue();
  }
  login(authData: User): Observable<UserResponse | void> {
    return this.http
      .post<UserResponse>(`${environment.API_URL}/api/login`, authData)
      .pipe(
        map((user: UserResponse) => {
          this.saveLocalStorage(user);
          this.user.next(user);
          return user;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  logout(): void {
    localStorage.removeItem('user');
    this.user.next(null);
    // window.location.href = 'login';
    this.router.navigate(['login']);
  }

  public checkToken(): void {
    const user = JSON.parse(localStorage.getItem('user')) || '';

    if (user) {
      const isExpired = helper.isTokenExpired(user.token);

      if (isExpired) {
        this.logout();
      } else {
        this.user.next(user);
      }
    } else {
      this.logout();
    }
  }

  private saveLocalStorage(user: UserResponse): void {
    const { user_id, message, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
  }

  private handlerError(err): Observable<never> {
    let errorMessage = 'An errror occured retrienving data';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
