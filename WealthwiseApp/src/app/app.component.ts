import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'WealthwiseApp';
  isLoggedIn = false;  // This should be set based on your authentication logic

  constructor(private router: Router) {
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    this.isLoggedIn = !sessionStorage.getItem('username');
  }

  logout() {
    // Implement actual logout logic
    localStorage.removeItem('username');
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
