import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private authService: AuthService) {}
  routeSelected: string = 'recipe';
  OnSelectRoute(route: string) {
    this.routeSelected = route;
  }
  title = 'Shopping and Recipe Listing';

  onLogin() {
    this.authService.login();
  }

  onLogout() {
    this.authService.logout();
  }
}
