import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BoardAdminComponent } from './_components/board-admin/board-admin.component';
import { BoardModeratorComponent } from './_components/board-moderator/board-moderator.component';
import { BoardUserComponent } from './_components/board-user/board-user.component';
import { BookFormComponent } from './_components/book-form/book-form.component';
import { BookComponent } from './_components/book/book.component';
import { HomeComponent } from './_components/home/home.component';
import { LoginComponent } from './_components/login/login.component';
import { PageNotFoundComponent } from './_components/page-not-found/page-not-found.component';
import { ProfileComponent } from './_components/profile/profile.component';
import { RegisterComponent } from './_components/register/register.component';
import { AuthorComponent } from './_components/author/author.component';
import { AuthorFormComponent } from './_components/author-form/author-form.component';
import { BookDetailsComponent } from './_components/book-details/book-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'books', component: BookComponent },
  { path: 'book-form/:bookId', component: BookFormComponent },
  { path: 'book-details/:bookId', component: BookDetailsComponent },
  { path: 'authors', component: AuthorComponent },
  { path: 'author-form/:id', component: AuthorFormComponent },
  { path: '**', component: PageNotFoundComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
