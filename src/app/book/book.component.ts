import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from '../models/author';
import { Book } from '../models/book';
import { BookService } from '../_services/book.service';
import * as _ from 'lodash';

@Component({
  selector: 'duyme2-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  public books: Book[] = [];
  public bookName: string = '';

  constructor(
    private bookService: BookService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.bookService.getBooks().subscribe((data) => {
      console.log(data);
      this.books = data;
    })
  }

  public addBook() {
    this.router.navigate(['book-form', 0]);
  }

  public deleteBook(bookId: any) {
    this.bookService.deleteBook(bookId).subscribe((data) => {
      this.loadData();
    });
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
