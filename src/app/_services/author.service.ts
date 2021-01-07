import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Author } from '../models/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token'
    }),
  }

  private readonly apiURL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getAuthors() {
    const URL = `${this.apiURL}authors`;
    return this.httpClient.get<any>(URL, this.httpOptions).pipe(catchError(this.handleError));
  }

  public getAuthor(authorId: number) {
    const URL = `${this.apiURL}author/` + authorId;
    return this.httpClient.get<any>(URL, this.httpOptions).pipe(catchError(this.handleError));
  }

  public addAuthor(author: Author) {
    const URL = `${this.apiURL}author`;
    return this.httpClient.post<any>(URL, author, this.httpOptions).pipe(catchError(this.handleError));
  }

  public modifyAuthor(authorId: number, author: Author) {
    const URL = `${this.apiURL}author/` + authorId;
    return this.httpClient.put<any>(URL, author, this.httpOptions).pipe(catchError(this.handleError));
  }

  public deleteAuthor(authortId: number) {
    const URL = `${this.apiURL}author/` + authortId;
    return this.httpClient.delete<any>(URL).pipe(catchError(this.handleError));
  }

  public getAuthorByAuthorName(authorName: string) {
    const URL = `${this.apiURL}author/search`;
    // return this.httpClient.post<any>(URL, this.httpOptions).pipe(catchError(this.handleError));
    let params = new HttpParams().set('authorName', authorName);

    return this.httpClient.get<any>(URL, { params: params });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
