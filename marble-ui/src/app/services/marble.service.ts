import { Injectable } from '@angular/core';
import { IMarble } from '../models/marble';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarbleService {

  private productsURL = '../../api/products.json'; // reads products from  json instead BE end-point

  constructor(private http: HttpClient) { }

  getAllMarbles(): Observable<IMarble[]> {
    return this.http.get<IMarble[]>(this.productsURL).pipe( // get<IMarble[]> when used with generic parameter 'get' method maps the returned data to provided type
      tap(data => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    ); 
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
 
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An Error Occurred: ${err.error.message}`;
    } else {
      // The back-end returned an unsuccessfull response code. 
      // The response body may contain clues as to what went wrong. 
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message} `;
    }

    return throwError(() => new Error(errorMessage));
  }
}
