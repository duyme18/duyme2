import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public totalAuthors = 0;
  public totalAuthors$ = new BehaviorSubject<number>(0);
  public totalComments = 0;
  public totalComments$ = new BehaviorSubject<number>(0);

  constructor() { }

  public setTotalAuthors(total: number) {
    this.totalAuthors = total;
    this.totalAuthors$.next(total);
  }

  public incrementTotalAuthors() {
    this.totalAuthors++;
    this.totalAuthors$.next(this.totalAuthors);
  }

  public setTotalComments(total: number) {
    this.totalComments = total;
    this.totalComments$.next(total);
  }

  public incrementTotalComments() {
    this.totalComments++;
    this.totalComments$.next(this.totalComments);
  }

}
