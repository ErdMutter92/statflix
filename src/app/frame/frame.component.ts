import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatDrawerMode } from '@angular/material/sidenav';
import { LoginService } from '../page/login/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss'],
})
export class FrameComponent implements OnInit, OnDestroy {
  public title: string = 'statflix';
  public showSidenav: boolean = true;
  public sidenavMode: MatDrawerMode = 'side';

  // Detects desktop vs mobile and sets the sidenav approprately.
  private onMobileViewChange?: Subscription;

  constructor(private breakpointObserver: BreakpointObserver, private loginService: LoginService) {}

  public ngOnInit() {
    this.onMobileViewChange = this.breakpointObserver
      .observe(['(min-width: 810px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.sidenavMode = 'side';
          this.showSidenav = true;
        } else {
          this.sidenavMode = 'over';
          this.showSidenav = false;
        }
      });
  }

  /**
   * Sync the sidenav's current state to the frame component's.
   *
   * @param event boolean flag representing the mat-sidenav's current opened state.
   */
  public sidenavOnOpenedChange(event: boolean): void {
    this.showSidenav = event;
  }

  public toggleSidenav() {
    this.showSidenav = !this.showSidenav;

    // NOTE: ngx-charts is unable to detect when the parrent container
    // changes size after the inital load, but triggers when a page
    // resize event is triggered on the window. This addresses that bug
    // in a timely manner.
    // TODO: Figure out a less hacky way of getting the graphs to resize
    // on their own
    window.dispatchEvent(new Event('resize'));
  }

  public logout() {
    this.loginService.logout();
  }

  public ngOnDestroy() {
    this.onMobileViewChange?.unsubscribe();
  }
}
