import {
  HttpClient,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { UserGroupResponse, UserGroup } from '@app/shared/models/user.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class UserGroupService {
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` })
  };

  httpOptionsFormdata = {
    headers: new HttpHeaders({ Authorization: `Bearer ${user.token}` })
  };

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addToken(request));
  }



  addToken(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const requestWithHeader = request.clone({
      headers: request.headers.set('Authorization', `Bearer ${user.token}`),
    });
    return requestWithHeader;
  }


  getAll(dataTablesParameters: any): Observable<UserGroupResponse> {
    return this.http
      .post<UserGroupResponse>(`${environment.API_URL}/api/user_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((branch: UserGroupResponse) => {
          return branch;
        }));
  }

  getById(userId: number): Observable<UserGroup> {
    return this.http
      .get<any>(`${environment.API_URL}/api/user/${userId}`)
      .pipe(catchError(this.handlerError));
  }

  new(user: UserGroup): Observable<UserGroup> {
    console.log(this.httpOptions);
    return this.http
      .post<UserGroup>(`${environment.API_URL}/api/user`, user, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(userId: number, user: UserGroup): Observable<UserGroup> {
    return this.http
      .patch<UserGroup>(`${environment.API_URL}/api/update_user/${userId}`, user, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(userId: number): Observable<{}> {
    return this.http
      .delete<UserGroupResponse>(`${environment.API_URL}/api/user/${userId}`, this.httpOptions)
      .pipe(
        map((user: UserGroupResponse) => {
          return user;
        }),
        catchError((err) => this.handlerError(err))
        );
  }

  handlerError(error): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
