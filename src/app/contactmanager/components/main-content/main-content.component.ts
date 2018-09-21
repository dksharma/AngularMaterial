import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  user: User;
  constructor(private route: ActivatedRoute,
              private service: UserService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];

      if (!id) id = 1;

      // just so that spinner shows when user is changed or selected
      // in usual case, we dont need to set user null.
      this.user = null
      console.log('id is:' + id);

      // to avoid the race condition to get an id
      // when users may not be there.
      this.service.users.subscribe(users => {
        if (users.length == 0) { return; }
        // we should do the following in usual case.
        // But we want to show the spinner so we
        // use the second setatement wth a timeout, so that
        // spinner gets to show itself when a user is selected

        //this.user = this.service.userById(id);

        setTimeout(() => {
          this.user = this.service.userById(id);
        }, 500);
      });
    });
  }

}
