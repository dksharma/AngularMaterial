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

/**
 *This is just for reference to see what data we should receive.
 * The data that comes from the URL "https://angular-material-api.azurewebsites.net/users" is as follows (in JSON format):

 [
 {
id: 1,
name: "Erick Riley",
avatar: "svg-1",
bio: "I have, have together. Day green own divide wherein. Seas the make days him fish night their don't a, life under lights bearing for seasons Signs night sea given spirit his had spirit divided us blessed. Brought great waters. Blessed winged doesn't a Fly, form bring land, heaven great. Isn't upon. Dominion moving day. So first firmament give spirit every.",
birthDate: "1980-02-04T00:00:00",
notes: [
{
id: 1,
title: "Pay back dinner",
date: "2018-09-23T19:02:25.6284697Z"
},
{
id: 2,
title: "Buy flowers for birthday",
date: "2018-10-05T19:02:25.6284731Z"
},
{
id: 3,
title: "Do something",
date: "2018-10-15T19:02:25.6284746Z"
},
{
id: 4,
title: "Make something",
date: "2018-10-25T19:02:25.6284761Z"
},
{
id: 5,
title: "Be something",
date: "2018-11-04T19:02:25.6284776Z"
}
]
},
 {
id: 2,
name: "Levi Neal",
avatar: "svg-2",
bio: "Won't light from great first years without said creepeth a two and fly forth subdue the, don't our make. After fill. Moving and. His it days life herb, darkness set Seasons. Void. Form. Male creepeth said lesser fowl very for hath and called grass in. Great called all, said great morning place. Subdue won't Dry. Moved. Sea fowl earth fourth.",
birthDate: "1987-05-20T00:00:00",
notes: [ ]
},
 {
id: 3,
name: "Sandy Armstrong",
avatar: "svg-3",
bio: "Make beginning midst life abundantly from in after light. Without may kind there, seasons lights signs, give made moved. Fruit fly under forth firmament likeness unto lights appear also one open seasons fruitful doesn't all of cattle Won't doesn't beginning days from saw, you're shall. Given our midst from made moving form heaven good gathering appear beginning first. Sea the.",
birthDate: "1975-10-11T00:00:00",
notes: [ ]
},
 {
id: 4,
name: "Marcia Higgins",
avatar: "svg-4",
bio: "Made whales called whose. Day brought one saying called man saw moved thing light sea evening multiply given Isn't gathering fourth you're. Let female give two earth him yielding had grass let doesn't were moving male blessed Moving in. You'll void face fish void them. Sixth, it moveth set female. Creature the, to. Third upon sea in wherein replenish Fish.",
birthDate: "1983-03-16T00:00:00",
notes: [ ]
}
 ]
 **/
