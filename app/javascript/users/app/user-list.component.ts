import * as moment from 'moment';

import { Http, Response } from '@angular/http';

import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../../interfaces';
import { UserService } from './user.service';
import template from './user-list.component.html';

@Component({
  selector: 'user-list',
  template: template
})
export class UserListComponent {
  users: User[] = [];

  constructor(private userService: UserService,
              private sanitizer: DomSanitizer) {
    this.getUsers();
  }

  public relativeTime(date: string) {
    return moment(date).fromNow();
  }

  public avatarStyle(user: User) {
    const style = `url('https://robohash.org/${user.id}`;
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }

  private getUsers() {
    this.userService.listUsers()
      .subscribe(users => this.users = users);
  }
}
