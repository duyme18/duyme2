import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from '../models/author';
import { AuthorService } from '../_services/author.service';
import * as _ from 'lodash';
import { CommonService } from '../_services/common.service';

@Component({
  selector: 'duyme2-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  public authors: Author[] = [];
  public authorName: string = '';

  constructor(
    private common: CommonService,
    private authorService: AuthorService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.authorService.getAuthors().subscribe((data) => {
      this.authors = data;
      this.common.setTotalAuthors(data.length);
      console.log(data.length);
    });

  }

  public addAuthor() {
    this.router.navigate(['author-form', 0]);
  }

  public deleteAuthor(authorId: any) {
    this.authorService.deleteAuthor(authorId).subscribe((data) => {
      this.loadData();
    });
  }

  public getAuthorByAuthorName() {
    this.authorService.getAuthorByAuthorName(this.authorName).subscribe((data) => {
      this.authors = data;
    });
  }

  public editAuthor(authorId: any) {
    this.router.navigate(['author-form', authorId]);
  }

  public orderBy(key: string, dir: any) {
    this.authors = _.orderBy(this.authors, key, dir);
  }
}
