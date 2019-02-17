import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { JsonPipe } from '@angular/common';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  getProducts(consumption: number): Observable<any> {
    return this.http.post<any>('http://pizzeria-express-rodgau.de/getProducts/', JSON.stringify({consumption: consumption}), httpOptions).pipe(
      catchError(this.handleError)
    );
  }

    // handling errors
    handleError(error: any) {
      const errMsg = (error.message) ? error.message : error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      return Observable.throw(errMsg);
    }

}
