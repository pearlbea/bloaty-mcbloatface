import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../interfaces';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  public getUser(id: number) {
    return this.http.get<User>(this.url(id));
  }

  public listUsers() {
    return this.http.get<User[]>(this.url());
  }

  private url(id?: number): string {
    if (id) {
      return `/users/${id}.json`;
    } else {
      return `/users.json`;
    }
  }
}
