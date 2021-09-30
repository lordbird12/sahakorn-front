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
import { CooperativeResponse, Cooperative } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class CooperativeService {
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
      .post<CooperativeResponse>(`${environment.API_URL}/api/cooperative/1`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((cooperative: CooperativeResponse) => {
          return cooperative;
        }));
  }

  getById(cooperativeId: number): Observable<Cooperative> {
    return this.http
      .get<any>(`${environment.API_URL}/api/cooperative/${cooperativeId}`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  new(cooperative: Cooperative): Observable<Cooperative> {
    console.log(this.httpOptions);
    return this.http
      .post<Cooperative>(`${environment.API_URL}/api/cooperative/1`, cooperative, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(cooperativeId: number, cooperative: Cooperative): Observable<Cooperative> {
    return this.http
      .post<Cooperative>(`${environment.API_URL}/api/cooperative_update`, cooperative, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(cooperativeId: number): Observable<{}> {
    return this.http
      .delete<CooperativeResponse>(`${environment.API_URL}/api/cooperative/${cooperativeId}`, this.httpOptions)
      .pipe(
        map((cooperative: CooperativeResponse) => {
          return cooperative;
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
