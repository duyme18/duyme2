import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../models/book';
import { BookService } from '../_services/book.service';

@Component({
  selector: 'duyme2-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {
  public bookId = 0;
  public bookForm = new FormGroup({
    bookName: new FormControl(''),
    translator: new FormControl(''),
    publishingYear: new FormControl('')
  })
  constructor(private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute) {

  }



  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['id'];

    if (this.bookId > 0) {
      this.loadData(this.bookId);
    }
  }

  private loadData(bookId: number) {
    this.bookService.getBook(bookId).subscribe((data => {
      for (const controlName in this.bookForm.controls) {
        if (controlName) {
          this.bookForm.controls[controlName].setValue(data[controlName]);
        }
      }
    }))
  }

  private createNewBook() {
    const newBook: any = {};

    for (const controlName in this.bookForm.contains) {
      if (controlName) {
        newBook[controlName] = this.bookForm.controls[controlName].value;
      }
    }
    return newBook as Book;
  }
  public save() {
    this.bookService.addBook(this.createNewBook()).subscribe((data) => {
      this.bookForm.reset();
    })
  }

  public saveGoToList() {

    this.bookService.addBook(this.createNewBook()).subscribe((data) => {
      this.router.navigate(['book']);
    })
  }
}
