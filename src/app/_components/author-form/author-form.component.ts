import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Author } from '../../models/author';
import { AuthorService } from '../../_services/author.service';
import { CommonService } from '../../_services/common.service';

@Component({
  selector: 'duyme2-author-form',
  templateUrl: './author-form.component.html',
  styleUrls: ['./author-form.component.scss']
})
export class AuthorFormComponent implements OnInit {

  public authorId = 0;
  isSubmitted = false;
  public authorForm = new FormGroup({
    authorName: new FormControl('', [Validators.required])
  }) as any;

  constructor(
    private common: CommonService,
    private authorService: AuthorService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.authorId = this.route.snapshot.params['id'];

    if (this.authorId > 0) {
      this.loadData(this.authorId);
    }
  }

  get f() {
    return this.authorForm.controls;
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
    this.isSubmitted = true;
    if (this.authorForm.invalid) {
      return;
    }
    if (this.authorId > 0) {
      this.authorService.modifyAuthor(this.authorId, this.createNewAuthor()).subscribe((data) => {
        alert('Sửa thành công!');
      });
    } else {
      this.authorService.addAuthor(this.createNewAuthor()).subscribe((data) => {
        alert('Thêm thành công!');
        this.common.incrementTotalAuthors();
        this.authorForm.reset();
      });
    }
  }

  public backToList() {
    this.router.navigate(['authors']);
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
