import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  message: string = '';
  fail : boolean = false;
  success : boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,  // Inject your AuthService
    private router: Router             // Inject Router to navigate on successful login
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (res: any) => {
          const token = res?.token;  // Extract token from response
          if (token) {

            sessionStorage.setItem('username', JSON.stringify(res)); 
            localStorage.setItem('authToken', token);   // Store token in localStorage
            this.message = `login successfully ,Welcome to Wealth Wise ${res.email}`
            
            setTimeout(() => {
              this.router.navigate(['/expenses']);       // Redirect to the dashboard
            }, 1000);
          } else {
            this.message = 'Failed to retrieve token. Please try again.';
          }
        },
        (error) => {
          this.message = 'Invalid login credentials. Please try again.';
          console.error('Login error:', error);
        }
      );
    }
  }
}
