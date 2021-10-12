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
import { PositionGroupResponse, PositionGroup } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class PositionGroupService {
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

  getAll(dataTablesParameters: any): Observable<PositionGroupResponse> {
    return this.http
      .post<PositionGroupResponse>(`${environment.API_URL}/api/position_group_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((positiongroup: PositionGroupResponse) => {
          return positiongroup;
        }));
  }

  getById(positionId: number): Observable<PositionGroup> {
    return this.http
      .get<any>(`${environment.API_URL}/api/position/${positionId}`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  new(positiongroup: PositionGroup): Observable<PositionGroup> {
    return this.http
      .post<PositionGroup>(`${environment.API_URL}/api/position_group`, positiongroup, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(positiongroupId: number, positiongroup: PositionGroup): Observable<PositionGroup> {
    return this.http
      .patch<PositionGroup>(`${environment.API_URL}/api/position_group/${positiongroupId}`, positiongroup, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(positiongroupId: number): Observable<{}> {
    return this.http
      .delete<PositionGroup>(`${environment.API_URL}/api/position_group/${positiongroupId}`, this.httpOptions)
      .pipe(
        map((positiongroup: PositionGroupResponse) => {
          return positiongroup;
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
