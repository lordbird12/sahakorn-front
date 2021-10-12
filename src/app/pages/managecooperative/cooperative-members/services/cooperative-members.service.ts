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
import { CooperativeMembersResponse,CooperativeMember} from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class CooperativeMembersService {
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


  getAll(dataTablesParameters: any): Observable<CooperativeMembersResponse> {
    return this.http
      .post<CooperativeMembersResponse>(`${environment.API_URL}/api/member_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((cooperativemembers: CooperativeMembersResponse) => {
          return cooperativemembers;
        }));
  }

  getById(cooperativemembersId: number): Observable<CooperativeMember> {
    return this.http
      .get<any>(`${environment.API_URL}/api/${cooperativemembersId}`)
      .pipe(catchError(this.handlerError));
  }

  new(cooperativemembers: CooperativeMember): Observable<CooperativeMember> {
    console.log(this.httpOptions);
    return this.http
      .post<CooperativeMember>(`${environment.API_URL}/api/member`, cooperativemembers, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(cooperativemembersId: number, cooperativemembers: CooperativeMember): Observable<CooperativeMember> {
    return this.http
      .patch<CooperativeMember>(`${environment.API_URL}/api/member/${cooperativemembersId}`, cooperativemembers, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(cooperativemembersId: number): Observable<{}> {
    return this.http
      .delete<CooperativeMembersResponse>(`${environment.API_URL}/api/member/${cooperativemembersId}`, this.httpOptions)
      .pipe(
        map((cooperativemembersId: CooperativeMembersResponse) => {
          return cooperativemembersId;
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




