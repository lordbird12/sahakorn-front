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
import { PrefixResponse, Prefix } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class PrefixService {
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

  getAll(dataTablesParameters: any): Observable<PrefixResponse> {
    return this.http
      .post<PrefixResponse>(`${environment.API_URL}/api/prefix_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((prefix: PrefixResponse) => {
          return prefix;
        }));
  }

  getById(userId: number): Observable<Prefix> {
    return this.http
      .get<any>(`${environment.API_URL}/api/prefix_page/${userId}`)
      .pipe(catchError(this.handlerError));
  }

  new(prefix: Prefix): Observable<Prefix> {
    console.log(this.httpOptions);
    return this.http
      .post<Prefix>(`${environment.API_URL}/api/prefix`, prefix, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  // new(prefix: prefix): Observable<prefix> {
  //   console.log(this.httpOptions);
  //   return this.http
  //     .post<prefix>(`${environment.API_URL}/api/prefix`, prefix, this.httpOptions)
  //     .pipe(catchError(this.handlerError));
  // }

  update(prefixId: number, prefix: Prefix): Observable<Prefix> {
    return this.http
      .patch<Prefix>(`${environment.API_URL}/api/prefix/${prefixId}`, prefix, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  // update(positionId: number, position: PositionType): Observable<PositionType> {
  //   return this.http
  //     .patch<PositionType>(`${environment.API_URL}/api/position_type/${positionId}`, position, this.httpOptions)
  //     .pipe(catchError(this.handlerError));
  // }

  delete(prefixId: number): Observable<{}> {
    return this.http
      .delete<Prefix>(`${environment.API_URL}/api/prefix/${prefixId}`, this.httpOptions)
      .pipe(catchError(this.handlerError));
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
