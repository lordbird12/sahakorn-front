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
import { PositionTypeResponse, PositionType } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class PositionTypeService {
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

  // getAll(): Observable<PositionResponse> {
  //   return this.http
  //     .get<PositionResponse>(`${environment.API_URL}/api/position`, this.httpOptions)
  //     .pipe(
  //       map((position: PositionResponse) => {
  //         return position;
  //       }));
  // }

  getAll(dataTablesParameters: any): Observable<PositionTypeResponse> {
    return this.http
      .post<PositionTypeResponse>(`${environment.API_URL}/api/person_type_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((position: PositionTypeResponse) => {
          return position;
        }));
  }

  getById(positionId: number): Observable<PositionType> {
    return this.http
      .get<any>(`${environment.API_URL}/api/person_type/${positionId}`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  new(position: PositionType): Observable<PositionType> {
    return this.http
      .post<PositionType>(`${environment.API_URL}/api/person_type`, position, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(positionId: number, position: PositionType): Observable<PositionType> {
    return this.http
      .patch<PositionType>(`${environment.API_URL}/api/person_type/${positionId}`, position, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(positionId: number): Observable<{}> {
    return this.http
      .delete<PositionType>(`${environment.API_URL}/api/person_type/${positionId}`, this.httpOptions)
      .pipe(
        map((position: PositionTypeResponse) => {
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
