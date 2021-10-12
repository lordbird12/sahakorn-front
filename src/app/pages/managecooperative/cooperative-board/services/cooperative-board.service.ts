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
import { CooperativeResponse, Loantype } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class CooperativeBoardService {
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


  getAll(dataTablesParameters: any): Observable<CooperativeResponse> {
    return this.http
      .post<CooperativeResponse>(`${environment.API_URL}/api/cooperative_board_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((cooperativeboard: CooperativeResponse) => {
          return cooperativeboard;
        }));
  }

  getById(cooperativeboardId: number): Observable<Loantype> {
    return this.http
      .get<any>(`${environment.API_URL}/api/${cooperativeboardId}`)
      .pipe(catchError(this.handlerError));
  }

  new(cooperativeboard: Loantype): Observable<Loantype> {
    console.log(this.httpOptions);
    return this.http
      .post<Loantype>(`${environment.API_URL}/api/cooperative_board`, cooperativeboard, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(cooperativeboardId: number, cooperativeboard: Loantype): Observable<Loantype> {
    return this.http
      .patch<Loantype>(`${environment.API_URL}/api/cooperative_board/${cooperativeboardId}`, cooperativeboard, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(cooperativeboardId: number): Observable<{}> {
    return this.http
      .delete<CooperativeResponse>(`${environment.API_URL}/api/cooperative_board/${cooperativeboardId}`, this.httpOptions)
      .pipe(
        map((loantypeId: CooperativeResponse) => {
          return loantypeId;
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
