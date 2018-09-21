import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user.service';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {MatSidenav} from '@angular/material';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width:${SMALL_WIDTH_BREAKPOINT}px)`);

  users: Observable<User[]>

  constructor(zone: NgZone, private userService: UserService, private router: Router) {
    // NgZone does not wrap the matchMedia - so we need to refresh the page.
    // to avoid that we have few choices:
    // 1. Inject ApplicationRef and call ApplicationRef.tick(),
    // 2. Inject ChangeDetectionRef and run the scan directly, or
    // 3. run the listener inside an Angular Zone.
    // Option 3 is more natual and does not require an action.
    // Following is the implementation of option 3.
    // We are adding this listener for change detection to the values of screen sizes,
    // so when screen size is smaller than 720, NgZone runs the function to set the value
    // of mediaMatcher, which in turn returns right value through isScreenSmall() method
    this.mediaMatcher.addListener(mql =>
    zone.run(() => this.mediaMatcher = mql));
  }

  // the sidenav is coming from sidenav.component.html
  // ViewChild is a view query. when DOM changes it selects the first child that matches the selector
  // which of type MatSideNav
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  ngOnInit() {
    // because this.users is an observable, it will get updated with user list when loaded
    this.users = this.userService.users;

    // Trigger the load by calling the service
    this.userService.loadAll();

    // subscribe
    // this.users.subscribe(data => {
    //   if (data.length > 0) {
    //     this.router.navigate(['/contactmanager', data[0].id]);
    //   }
    // });

    // To avoid the probelm when you are on a small screen and even after selecting
    // a user from side nav, side-nav does not closes
    this.router.events.subscribe(() => {
      if (this.isScreenSmall()){
        // Close the sidenav
        // This is used in concert with @ViewChild
        this.sidenav.close();
      }
    });
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}
