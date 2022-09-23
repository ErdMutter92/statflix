import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent, LoginErrorStateMatcher } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginService } from './login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [LoginService],
      declarations: [LoginComponent],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        LoginRoutingModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatFormFieldModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default loginBackgrounds', () => {
    expect(component.loginBackgrounds).toEqual([
      '/assets/login-bg-2.jpg',
      '/assets/login-bg-3.jpg',
      '/assets/login-bg-4.jpg',
      '/assets/login-bg-5.jpg',
      '/assets/login-bg-6.jpg',
    ]);
  });

  it('should have email form control', () => {
    expect(component.emailFormControl).toEqual(jasmine.any(FormControl));
  });

  it('should have password form control', () => {
    expect(component.passwordFormControl).toEqual(jasmine.any(FormControl));
  });

  it('should have a login error state matcher', () => {
    expect(component.matcher).toEqual(jasmine.any(LoginErrorStateMatcher));
  });

  describe('formOnSubmit', () => {
    it('should set error on email field if user does not exist', () => {
      expect(component.emailFormControl.hasError('incorrect')).toBeFalse();

      component.emailFormControl.setValue('user@dosnt.exist');
      component.passwordFormControl.setValue('not_the_password');
      fixture.detectChanges();

      component.formOnSubmit();

      expect(component.emailFormControl.getError('incorrect')).toBeTrue();
    });

    it('should set error on password field if user does not exist', () => {
      expect(component.passwordFormControl.hasError('incorrect')).toBeFalse();

      component.emailFormControl.setValue('user@dosnt.exist');
      component.passwordFormControl.setValue('not_the_password');
      fixture.detectChanges();

      component.formOnSubmit();

      expect(component.passwordFormControl.getError('incorrect')).toBeTrue();
    });

    it('should navigate when authenticate is successful', () => {
      spyOn((component as any).router, 'navigateByUrl');
      component.emailFormControl.setValue('user@your.company');
      component.passwordFormControl.setValue('welcome');
      fixture.detectChanges();

      component.formOnSubmit();

      expect((component as any).router.navigateByUrl).toHaveBeenCalledWith('/app');
    });

    it('should authenticate user', () => {
      spyOn((component as any).loginService, 'authenticate');

      component.emailFormControl.setValue('user@your.company');
      component.passwordFormControl.setValue('welcome');
      fixture.detectChanges();

      component.formOnSubmit();

      expect((component as any).loginService.authenticate).toHaveBeenCalledWith('user@your.company', 'welcome');
    });
  });

  describe('forgetPasswordOnClick', () => {
    it('should set username for demo purposes', () => {
      component.forgotPasswordOnClick();

      expect(component.emailFormControl.value).toEqual('user@your.company');
    });

    it('should set password for demo purposes', () => {
      component.forgotPasswordOnClick();

      expect(component.passwordFormControl.value).toEqual('welcome');
    });
  });
});
