import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from '../models/author';
import { Book } from '../models/book';
import { BookService } from '../_services/book.service';
import * as _ from 'lodash';
import { AuthorService } from '../_services/author.service';

@Component({
  selector: 'duyme2-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  public books: Book[] = [];
  public authors: Author[] = [];
  public bookName: string = '';

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private router: Router) { }

  ngOnInit(): void {
    this.getBooks();
  }

  private getBooks() {
    this.bookService.getBooks().subscribe((data) => {
      this.books = data;
    })
  }

  private getAuthors() {
    this.authorService.getAuthors().subscribe((data) => {
      this.authors = data;
    })
  }

  public addBook() {
    this.router.navigate(['book-form', 0]);
  }

  public deleteBook(bookId: any) {
    this.bookService.deleteBook(bookId).subscribe((data) => {
      this.getBooks();
    });
  }

  public showBookDetails(bookId: any) {
    this.router.navigate(['book-details', bookId]);
  }

  public editBook(bookId: any) {
    this.router.navigate(['book-form', bookId]);
  }

  public getBookByBookName() {
    this.bookService.getBookByBookName(this.bookName).subscribe((data) => {
      this.books = data;
    });
  }

  public orderBy(key: string, dir: any) {
    this.books = _.orderBy(this.books, key, dir);
  }
}
