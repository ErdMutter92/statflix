import { Component } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent {
  public title: string = 'statflix';
  public showSidenav: boolean = true;
  public sidenavMode: MatDrawerMode = 'side';

  // Detects desktop vs mobile and sets the sidenav approprately.
  private onMobileViewChange = this.breakpointObserver
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

  constructor(private breakpointObserver: BreakpointObserver) {}

  public ngOnDestroy() {
    this.onMobileViewChange.unsubscribe();
  }
}
