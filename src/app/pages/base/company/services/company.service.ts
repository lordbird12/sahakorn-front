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
import { CompanyResponse, Company } from '@app/shared/models/base.interface';
import { catchError, map } from 'rxjs/operators';
const user = JSON.parse(localStorage.getItem('user')) || null;
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
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

  getAll(dataTablesParameters: any): Observable<CompanyResponse> {
    return this.http
      .post<CompanyResponse>(`${environment.API_URL}/api/company_page`, dataTablesParameters, this.httpOptions)
      .pipe(
        map((branch: CompanyResponse) => {
          return branch;
        }));
  }

  getById(companyId: number): Observable<Company> {
    return this.http
      .get<any>(`${environment.API_URL}/api/company/${companyId}`)
      .pipe(catchError(this.handlerError));
  }

  new(company: Company): Observable<Company> {
    console.log(this.httpOptions);
    return this.http
      .post<Company>(`${environment.API_URL}/api/company`, company, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  update(companyId: number, company: Company): Observable<Company> {
    return this.http
      .patch<Company>(`${environment.API_URL}/api/company/${companyId}`, company, this.httpOptions)
      .pipe(catchError(this.handlerError));
  }

  delete(companyId: number): Observable<{}> {
    return this.http
      .delete<CompanyResponse>(`${environment.API_URL}/api/company/${companyId}`, this.httpOptions)
      .pipe(
        map((company: CompanyResponse) => {
          return company;
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
