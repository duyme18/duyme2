import { Component, OnInit } from '@angular/core';
import { AuthorService } from './_services/author.service';
import { CommonService } from './_services/common.service';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'duyme2-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  public totalAuthors = 0;

  constructor(
    private common: CommonService,
    private authorService: AuthorService,
    private tokenStorageService: TokenStorageService
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }

    this.common.totalAuthors$.subscribe((total) => {
      this.totalAuthors = total;
    });

    if (this.common.totalAuthors === 0) {
      this.authorService.getAuthors().subscribe((data) => {
        this.common.setTotalAuthors(data.length);
      })
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
