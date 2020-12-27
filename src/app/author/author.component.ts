import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Author } from '../models/author';
import { AuthService } from '../_services/auth.service';
import { AuthorService } from '../_services/author.service';

@Component({
  selector: 'duyme2-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit {

  public authors: Author[] = [];

  constructor(private authorService: AuthorService,
    private router: Router) { }

  ngOnInit(): void {
    this.loadData();
  }
  
  private loadData() {
    this.authorService.getAuthors().subscribe((data) => {
      this.authors = data;
      console.log(data);
    });
  }

}
