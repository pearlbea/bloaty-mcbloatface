import 'rxjs/add/operator/switchMap';

import * as moment from 'moment';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Http, Response } from '@angular/http';

import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { User } from '../../interfaces';
import { UserService } from './user.service';
import template from './user-details.component.html';

@Component({
  selector: 'user-details',
  template: template
})
export class UserDetailsComponent {
  user$: Observable<User>;

  constructor(private userService: UserService,
              private sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private router: Router) {}

  public ngOnInit() {
    this.user$ = this.route.paramMap.switchMap(this.getUser.bind(this));
  }

  public relativeTime(date: string) {
    return moment(date).fromNow();
  }

  public avatarStyle(user: User) {
    const style = `url('https://robohash.org/${user.id}`;
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }

  public html(about: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(about);
  }

  private getUser(params: ParamMap): Observable<User> {
    return this.userService.getUser(Number(params.get('id')));
  }
}
