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
import { DivisionResponse, Division } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class DivisionService {
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

  getAll(dataTablesParameters: any): Observable<DivisionResponse> {
    return this.http
      .post<DivisionResponse>(`${environment.API_URL}/api/division_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((division: DivisionResponse) => {
          return division;
        }));
      }


  getById(divisionId: number): Observable<Division> {
    return this.http
      .get<any>(`${environment.API_URL}/api/division/${divisionId}`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  new(division: Division): Observable<Division> {
    return this.http
      .post<Division>(`${environment.API_URL}/api/division`, division, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(divisionId: number, division: Division): Observable<Division> {
    return this.http
      .patch<Division>(`${environment.API_URL}/api/division/${divisionId}`, division, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(divisionId: number): Observable<{}> {
    return this.http
      .delete<Division>(`${environment.API_URL}/api/division/${divisionId}`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  handlerError(error): Observable<never> {
    let errorMessage = 'Error unknown';
    if (error) {
      errorMessage = `Error ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
