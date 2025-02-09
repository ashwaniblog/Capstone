import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm: FormGroup;
  otpForm: FormGroup;
  showOtpForm = false;  // Controls whether the OTP form is shown
  message = '';

  constructor(private userService: AuthService, private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value).subscribe(
        (response) => {
          this.message = 'Registration successful! Please enter the OTP sent to your email.';
          this.showOtpForm = true;  // Show OTP form on successful registration
        },
        (error) => {
          this.message = 'Registration failed. Try again.';
          this.showOtpForm = false;  // Do not show OTP form on error
        }
      );
    }
  }

  onVerifyOtp() {
    if (this.otpForm.valid) {
      const otpData = {
        email: this.registerForm.value.email,
        otp: this.otpForm.value.otp
      };

      this.userService.verifyOtp(otpData).subscribe(
        (response) => {
          this.message = 'OTP verified successfully! Your account is now activated.';
          this.showOtpForm = false;
          // Redirect to login or dashboard here if needed
        },
        (error) => {
          this.message = 'Invalid OTP. Please try again.';
        }
      );
    }
  }
}
