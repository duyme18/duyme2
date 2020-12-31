import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { catchError, map, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token'
    }),
  }

  private readonly homeUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public getBooks() {
    const URL = `${this.homeUrl}books`;
    return this.httpClient.get<any>(URL, this.httpOptions).pipe(catchError(this.handleError));
  }

  public getBook(bookId: number) {
    const url = `${this.homeUrl}book/` + bookId;
    return this.httpClient.get<any>(url, this.httpOptions).pipe(catchError(this.handleError));
  }

  public addBook(book: Book) {
    const URL = `${this.homeUrl}book`;
    return this.httpClient.post<any>(URL, book, this.httpOptions).pipe(catchError(this.handleError));
  }

  public modifyBook(bookId: number, book: Book){
    const URL = `${this.homeUrl}book/` + bookId;
    return this.httpClient.put<any>(URL, book, this.httpOptions).pipe(catchError(this.handleError));
  }

  public deleteBook(bookId: number) {
    const URL = `${this.homeUrl}book/` + bookId;
    return this.httpClient.delete<any>(URL).pipe(catchError(this.handleError));
  }

  public getBookByBookName(bookName: string) {
    const URL = `${this.homeUrl}book/search`;
    let params = new HttpParams().set('bookName', bookName);

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
