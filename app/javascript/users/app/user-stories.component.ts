import 'rxjs/add/operator/switchMap';

import * as moment from 'moment';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Http, Response } from '@angular/http';

import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { Story, User } from '../../interfaces';
import { StoryService } from './story.service';
import { UserService } from './user.service';
import template from './user-stories.component.html';

@Component({
  selector: 'user-stories',
  template: template
})
export class UserStoriesComponent {
  stories$: Observable<Story[]>;
  user$: Observable<User>;

  constructor(private storyService: StoryService,
              private userService: UserService,
              private sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private router: Router) {}

  public ngOnInit() {
    this.stories$ = this.route.paramMap.switchMap(this.getStories.bind(this));
    this.user$ = this.route.paramMap.switchMap(this.getUser.bind(this));
  }

  public relativeTime(date: string) {
    return moment(date).fromNow();
  }

  private getUser(params: ParamMap): Observable<User> {
    return this.userService.getUser(Number(params.get('id')));
  }

  private getStories(params: ParamMap): Observable<Story[]> {
    return this.storyService.getUserStories(Number(params.get('id')));
  }
}
