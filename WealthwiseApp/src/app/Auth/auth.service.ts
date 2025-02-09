import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/users';  // Adjust according to your backend setup

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    console.log("my service data is " , userData);
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }

  verifyOtp(otpData: any) {
    console.log("otp data");
    return this.http.post(`${this.apiUrl}/verify-otp`, otpData);
  }

}
