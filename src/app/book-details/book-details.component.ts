import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../models/book';
import { Comment } from '../models/comment';
import { AuthorService } from '../_services/author.service';
import { BookService } from '../_services/book.service';
import { CommentService } from '../_services/comment.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'duyme2-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  public bookId = 0;
  public bookName = '';
  public book?: Book;
  public comments: Comment[] = [];
  public commentForm = new FormGroup({
    content: new FormControl('')
  });
  public commentUpdate = new FormControl();
  public tokenJWT: string;
  public userInfo: any;
  public userId: string;
  idComment?: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private commentService: CommentService,
    private token: TokenStorageService,
    private bookService: BookService) {
    this.activatedRoute.params.subscribe(params => {
      this.bookId = params.bookId;
      this.bookName = params.bookName;
    });
    this.userId = this.token.getUserId();
    this.tokenJWT = this.token.getToken();
  }

  ngOnInit(): void {
    this.getBook();
    this.getAllCommentByBook();
    console.log(this.bookId, this.token.getUsername());

    this.userInfo = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      role: this.token.getAuthorities()
    };

    console.log(this.userInfo)
  }

  private getBook() {
    this.bookService.getBook(this.bookId).subscribe((data) => {
      this.book = data;
    });
  }

  private getAllCommentByBook() {
    this.commentService.getAllCommentByBook(this.bookId).subscribe((data) => {
      this.comments = data;
    });
  }

  addComment() {

    const { content } = this.commentForm.value;

    if (content === '') {
      return;
    }

    const comment: any = {
      bookId: this.bookId,
      content: content,
      user: {
        id: this.token.getUserId()
      }
    }
    console.log(comment);
    this.commentService.addComment(this.bookId, comment).subscribe((result) => {
      this.commentForm.reset();
      this.getAllCommentByBook();
    })
  }

  updateComment(commentId: string, closeModalRef: HTMLAnchorElement) {

    if (this.commentUpdate.value == null) {
      return this.closeForm(closeModalRef);
    }

    const comment: any = {
      id: commentId,
      comment: this.commentUpdate.value
    };

    this.commentService.modifyComment(comment).subscribe(result => {
      this.closeForm(closeModalRef);
    }, error => {
      console.log(error);
    });
    console.log(comment);
  }

  getIdComment(id: string) {
    this.idComment = id;
  }

  closeForm(closeModalRef: HTMLAnchorElement) {
    closeModalRef.click();
    this.getAllCommentByBook();
    this.commentUpdate.reset();
  }
}
