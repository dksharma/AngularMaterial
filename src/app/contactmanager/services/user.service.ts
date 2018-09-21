import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // local data store
  private dataStore: {
    users: User[]
  }

  // this is the property exposed to the user as BehaviorSubject
  private _users : BehaviorSubject<User[]>;

  constructor(private http: HttpClient) {
    this.dataStore = { users : [] };
    this._users = new BehaviorSubject<User[]>([]);
  }

  // this method will allow users to subscribe to the list of users
  get users(): Observable<User[]> {
    return this._users.asObservable();
  }

  userById(id: number){
    return this.dataStore.users.find(x => x.id == id);
  }

  loadAll() {
    const userUrl = 'https://angular-material-api.azurewebsites.net/users';

    return this.http.get<User[]>(userUrl)
      .subscribe(data => {
        this.dataStore.users = data;
        // We have to call .next() method on BehaviorSubject, to let users know that
        // data is available. Only a copy of the list of users from the data store.

        this._users.next(Object.assign({}, this.dataStore).users);
      }, error => {
        console.log('failed to fetch users');
      } );
  }
}
