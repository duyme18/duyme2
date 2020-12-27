import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../models/book';
import { BookService } from '../_services/book.service';

@Component({
  selector: 'duyme2-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  public books: Book[] = [];

  constructor(private bookService: BookService, private router: Router) { }

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
}
