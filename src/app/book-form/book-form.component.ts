import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from '../models/author';
import { Book } from '../models/book';
import { AuthorService } from '../_services/author.service';
import { BookService } from '../_services/book.service';

@Component({
  selector: 'duyme2-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  public bookId = 0;
  public authors: Author[] = [];
  public authorId = 0;
  public book?: Book;
  public bookForm = new FormGroup({
    bookName: new FormControl(''),
    translator: new FormControl(''),
    bookAmount: new FormControl(''),
    publishingYear: new FormControl(''),
    rentConst: new FormControl(''),
    bookDescription: new FormControl(''),
    authorId: new FormControl('')
  }) as any;

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['bookId'];

    if (this.bookId > 0) {
      this.loadData(this.bookId);
    }

    this.getAuthors();
  }

  private loadData(bookId: number) {
    this.bookService.getBook(bookId).subscribe((data => {
      for (const controlName in this.bookForm.controls) {
        if (controlName) {
          this.bookForm.controls[controlName].setValue(data[controlName]);
        }
      }
      this.authorId = data.author.authorId;
    }));
  }

  private getAuthors() {
    this.authorService.getAuthors().subscribe((data) => {
      this.authors = data;
    })
  }

  // private createNewBook() {
  //   const newBook: any = {};

  //   for (const controlName in this.bookForm.controls) {
  //     if (controlName) {
  //       newBook[controlName] = this.bookForm.controls[controlName].value;
  //     }
  //   }
  //   return newBook as Book;
  // }

  public save() {
    if (this.bookId > 0) {
      this.bookService.modifyBook(this.bookId, this.createNewBook()).subscribe((data) => {

      });
    } else {
      this.bookService.addBook(this.createNewBook()).subscribe((data) => {
        this.bookForm.reset();
      });
    }
  }

  public saveGoToList() {
    if (this.bookId > 0) {
      this.bookService.modifyBook(this.bookId, this.createNewBook()).subscribe((data) => {
        this.router.navigate(['books']);
      });
    } else {
      this.bookService.addBook(this.createNewBook()).subscribe((data) => {
        this.router.navigate(['books']);
      });
    }
  }

  public createNewBook() {
    const {
      bookName,
      translator,
      bookAmount,
      publishingYear,
      rentConst,
      bookDescription,
      authorId
    } = this.bookForm.value;

    const newBook: any = {
      bookName,
      translator,
      bookAmount,
      publishingYear,
      rentConst,
      bookDescription,
      author: {
        authorId: authorId
      }
    }
    for (const controlName in this.bookForm.controls) {
      if (controlName) {
        newBook[controlName] = this.bookForm.controls[controlName].value;
      }
    }
    return newBook as Book;

  }

}
