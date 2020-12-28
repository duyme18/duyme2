import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { throwIfEmpty } from 'rxjs/operators';
import { Author } from '../models/author';
import { AuthorService } from '../_services/author.service';

@Component({
  selector: 'duyme2-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss']
})
export class AuthorFormComponent implements OnInit {

  public authorId = 0;
  public authorForm = new FormGroup({
    authorName: new FormControl('')
  });

  constructor(private authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.authorId = this.route.snapshot.params['id'];

    if (this.authorId > 0) {
      this.loadData(this.authorId);
    }
  }

  private loadData(authorId: number) {
    this.authorService.getAuthor(authorId).subscribe((data => {
      for (const controlName in this.authorForm.controls) {
        if (controlName) {
          this.authorForm.controls[controlName].setValue(data[controlName]);
        }
      }
    }));
  }

  private createNewAuthor() {
    const newAuthor: any = {};

    for (const controlName in this.authorForm.controls) {
      if (controlName) {
        newAuthor[controlName] = this.authorForm.controls[controlName].value;
      }
    }
    return newAuthor as Author;
  }

  public save() {
    if (this.authorId > 0) {
      this.authorService.modifyAuthor(this.authorId, this.createNewAuthor()).subscribe((data) => {
      });
    } else {
      this.authorService.addAuthor(this.createNewAuthor()).subscribe((data) => {
        this.authorForm.reset();
      });
    }
  }

  public saveGoToList() {
    if (this.authorId > 0) {
      this.authorService.modifyAuthor(this.authorId, this.createNewAuthor()).subscribe((data) => {
        this.router.navigate(['authors']);
      });
    } else {
      this.authorService.addAuthor(this.createNewAuthor()).subscribe((data) => {
        this.router.navigate(['authors']);
      });
    }
  }
}
