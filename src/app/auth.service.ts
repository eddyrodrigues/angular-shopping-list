import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  isLogged: boolean = false;
  login() {
    this.isLogged = true;
    console.log('logged');
    return true;
  }
  logout() {
    this.isLogged = false;
    console.log('not logged');
    return false;
  }
}
