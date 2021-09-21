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
import { ReligionResponse, Religion } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class ReligionService {
  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Authorization: `Bearer ${user.token}` })
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

  getAll(dataTablesParameters: any): Observable<ReligionResponse> {
    return this.http
      .post<ReligionResponse>(`${environment.API_URL}/api/religion_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((position: ReligionResponse) => {
          return position;
        }));
  }

  getById(positionId: number): Observable<Religion> {
    return this.http
      .get<any>(`${environment.API_URL}/api/religion/${positionId}`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  new(position: Religion): Observable<Religion> {
    return this.http
      .post<Religion>(`${environment.API_URL}/api/religion`, position, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(positionId: number, position: Religion): Observable<Religion> {
    return this.http
      .patch<Religion>(`${environment.API_URL}/api/religion/${positionId}`, position, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(positionId: number): Observable<{}> {
    return this.http
      .delete<Religion>(`${environment.API_URL}/api/religion/${positionId}`, this.httpOptions)
      .pipe(
        map((position: ReligionResponse) => {
          return position;
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
