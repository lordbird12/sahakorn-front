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
import { EmployeeResponse, Employee, DepartmentResponse,
  BranchResponse,
  PrefixResponse,
  CompanyResponse,
  DivisionResponse,
  PersonTypeResponse,
  PositionGroupResponse,
  PositionTypeResponse,
  PositionLevelResponse,
  PositionResponse } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
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

  getAll(dataTablesParameters: any): Observable<EmployeeResponse> {
    return this.http
      .post<EmployeeResponse>(`${environment.API_URL}/api/person_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((employee: EmployeeResponse) => {
          return employee;
        }));
  }

  getPrefix(): Observable<PrefixResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/prefix`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getCompany(): Observable<CompanyResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/company`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getBranch(): Observable<BranchResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/branch`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getDivition(): Observable<DivisionResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/division`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getDepartment(): Observable<DepartmentResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/department`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getPosition(): Observable<PositionResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/position`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getPersosType(): Observable<PersonTypeResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/person_type`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getPositionGroup(): Observable<PositionGroupResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/position_group`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getPositionType(): Observable<PositionTypeResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/position_type`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getPositionLevel(): Observable<PositionLevelResponse> {
    return this.http
      .get<any>(`${environment.API_URL}/api/position_level`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  getById(userId: number): Observable<Employee> {
    return this.http
      .get<any>(`${environment.API_URL}/api/user/${userId}`, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  new(employee: FormData): Observable<Employee> {
    return this.http
      .post<Employee>(`${environment.API_URL}/api/person`, employee, this.httpOptionsFormdata)
      .pipe(catchError(this.handlerError));
  }

  update(userId: number, employee: FormData): Observable<Employee> {
    return this.http
      .post<Employee>(`${environment.API_URL}/api/person`, employee, this.httpOptionsFormdata)
      .pipe(catchError(this.handlerError));
  }

  delete(employeeId: number): Observable<{}> {
    return this.http
      .delete<Employee>(`${environment.API_URL}/api/person/${employeeId}`, this.httpOptions)
      .pipe(
        map((employee: EmployeeResponse) => {
          return employee;
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
