import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Story } from '../../interfaces';

@Injectable()
export class StoryService {
  constructor(private http: HttpClient) { }

  public getUserStories(id: number) {
    return this.http.get<Story[]>(this.url(id));
  }
  private url(id: number): string {
    return `/users/${id}/stories.json`;
  }
}
