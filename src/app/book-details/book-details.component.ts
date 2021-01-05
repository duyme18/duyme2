import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../models/book';
import { AuthorService } from '../_services/author.service';
import { BookService } from '../_services/book.service';

@Component({
  selector: 'duyme2-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  public bookId = 0;
  public bookName: string = '';
  public book?: Book;
  constructor(
    private activatedRoute: ActivatedRoute,
    private bookService: BookService,
    private authorService: AuthorService,
    private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      this.bookId = params.bookId;
      this.bookName = params.bookName;
    });
  }

  ngOnInit(): void {
    this.getBook();
  }

  private getBook() {
    this.bookService.getBook(this.bookId).subscribe((data) => {
      this.book = data;
      console.log(this.book);
    });
  }
}
