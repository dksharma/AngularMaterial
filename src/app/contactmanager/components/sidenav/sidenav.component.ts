import {Component, NgZone, OnInit} from '@angular/core';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private mediaMatcher: MediaQueryList = matchMedia(`(max-width:${SMALL_WIDTH_BREAKPOINT}px)`);

  constructor(zone: NgZone) {
    // NgZone does not wrap the matchMedia - so we need to refresh the page.
    // to avoid that we have few choices:
    // 1. Inject ApplicationRef and call ApplicationRef.tick(),
    // 2. Inject ChangeDetectionRef and run the scan directly, or
    // 3. run teh listener inside an Angular Zone.
    // Option 3 is more natual and does not require an action.
    // Following is the implementation of option 3.
    // We are adding this listener for change detection to the values of screen sizes,
    // so when screen size is smaller than 720, NgZone runs the function to set the value
    // of mediaMatcher, which in turn returns right value through isScreenSmall() method
    this.mediaMatcher.addListener(mql =>
    zone.run(() => this.mediaMatcher = mql));
  }

  ngOnInit() {
  }

  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }
}
