import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

type UserAccountDetails = {
  username: string;
  password: string;
};

/**
 * This entire service is just here for demo login as there is
 * no backend.
 *
 * TODO: Move window refs to a injectable item for easier testing.
 */
@Injectable()
export class LoginService {
  public readonly users: UserAccountDetails[] = [{ username: 'user@your.company', password: 'welcome' }];

  constructor(private router: Router) {}

  public userExists(username: string): boolean {
    return this.users.some((user) => user.username === username);
  }

  public validatePassword(user: UserAccountDetails, password: string) {
    return user.password === password;
  }

  public authenticate(username: string, password: string) {
    const user = this.users.find((user) => user.username === username);

    if (user && this.validatePassword(user, password)) {
      window.localStorage.setItem('auth', 'true');
      return true;
    } else {
      window.localStorage.setItem('auth', 'false');
      return false;
    }
  }

  public logout() {
    window.localStorage.setItem('auth', 'false');
    this.router.navigateByUrl('/login');
  }
}
