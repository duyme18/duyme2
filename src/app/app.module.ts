import { UploadFilesComponent } from './_components/upload-files/upload-files.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardAdminComponent } from './_components/board-admin/board-admin.component';
import { BoardModeratorComponent } from './_components/board-moderator/board-moderator.component';
import { BoardUserComponent } from './_components/board-user/board-user.component';
import { HomeComponent } from './_components/home/home.component';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';
import { ProfileComponent } from './_components/profile/profile.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { BookComponent } from './_components/book/book.component';
import { BookFormComponent } from './_components/book-form/book-form.component';
import { PageNotFoundComponent } from './_components/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorComponent } from './_components/author/author.component';
import { AuthorFormComponent } from './_components/author-form/author-form.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { BookDetailsComponent } from './_components/book-details/book-details.component';
import { HeaderComponent } from './template/header/header.component';
import { FooterComponent } from './template/footer/footer.component';
import { CanActivateTeam } from './deactivate/can-activate-team';
import { NotActivateTeam } from './deactivate/not-activate-team';
import { IsAdmin } from './deactivate/is-admin';

@NgModule({
  declarations: [
    AppComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BookComponent,
    BookFormComponent,
    PageNotFoundComponent,
    AuthorComponent,
    AuthorFormComponent,
    BookDetailsComponent,
    HeaderComponent,
    FooterComponent,
    UploadFilesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    MatFormFieldModule,
    MatSliderModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatBadgeModule,
  ],
  providers: [authInterceptorProviders, Permissions, CanActivateTeam, NotActivateTeam, IsAdmin],
  bootstrap: [AppComponent]
})
export class AppModule { }
