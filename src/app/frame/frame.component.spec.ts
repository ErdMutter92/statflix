import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { ComponentFixture, TestBed, flush } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, Subject } from 'rxjs';
import { LoginService } from '../page/login/login.service';
import { CommonPipesModule } from '../pipes/common-pipes.module';

import { FrameComponent } from './frame.component';

describe('FrameComponent', () => {
  let component: FrameComponent;
  let fixture: ComponentFixture<FrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrameComponent],
      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatMenuModule,
        MatListModule,
        CommonPipesModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        RouterTestingModule,
      ],
      providers: [LoginService],
    }).compileComponents();

    fixture = TestBed.createComponent(FrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have a title 'statflix'`, () => {
    expect(component.title).toEqual('statflix');
  });

  it(`should display a title 'Statflix'`, () => {
    const fixture = TestBed.createComponent(FrameComponent);
    fixture.detectChanges();
    const toolbarTitle = fixture.nativeElement.querySelector('.mat-toolbar > span');

    expect(toolbarTitle.textContent).toContain('Statflix');
  });

  it('should define showSidenav', () => {
    const expected = window.innerWidth >= 810;
    expect(component.showSidenav).toBe(expected);
  });

  it('should define sidenavMode', () => {
    const expected = window.innerWidth >= 810 ? 'side' : 'over';
    expect(component.sidenavMode).toBe(expected);
  });

  describe('ngOnInit', () => {
    xit('should change to mobile settings bellow 810px', () => {});
    xit('should change to desktop settings above 810px', () => {});
  });

  describe('sidenavOnOpenChange', () => {
    const possibleEvent = [true, false];

    possibleEvent.forEach(event => {
      it(`should set the showSidenav (event: ${event})`, () => {
        component.showSidenav = !event; // set to oposite;
        component.sidenavOnOpenedChange(event);

        expect(component.showSidenav).toBe(event);
      });
    });
  });

  describe('toggleSidenav', () => {
    it('should toggle showSidenav (true)', () => {
      component.showSidenav = true;

      component.toggleSidenav();

      expect(component.showSidenav).toBeFalse();
    });

    it('should toggle showSidenav (false)', () => {
      component.showSidenav = false;

      component.toggleSidenav();

      expect(component.showSidenav).toBeTrue();
    });

    it('should dispatch resize event', () => {
      spyOn(window, 'dispatchEvent');

      component.toggleSidenav();

      expect(window.dispatchEvent).toHaveBeenCalledWith(new Event('resize'));
    });
  });

  describe('logout', () => {
    it('should instruct login service to logout', () => {
      spyOn((component as any).loginService, 'logout');

      component.logout();

      expect((component as any).loginService.logout).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from onMobileViewChange', () => {
      spyOn((component as any).onMobileViewChange, 'unsubscribe').and.callThrough();

      component.ngOnDestroy();

      expect((component as any).onMobileViewChange.unsubscribe).toHaveBeenCalled();
    });
  });
});
