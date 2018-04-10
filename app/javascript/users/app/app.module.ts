import { MatButtonModule, MatCardModule, MatToolbarModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { UserDetailsComponent } from './user-details.component';
import { UserListComponent } from './user-list.component';
import { UserService } from './user.service';
import { StoryService } from './story.service';
import { UserStoriesComponent } from './user-stories.component';

const appRoutes: Routes = [
  { path: 'users/:id/stories', component: UserStoriesComponent },
  { path: 'users/:id', component: UserDetailsComponent },
  { path: 'users', component: UserListComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    UserDetailsComponent,
    UserListComponent,
    UserStoriesComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
  ],
  providers: [
    StoryService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
