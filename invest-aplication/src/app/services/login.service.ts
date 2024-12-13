import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LoginResponse } from '../types/login-response.type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly apiUrl: string = 'http://localhost:8080/auth';

  constructor(private httpClient: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.httpClient
      .post<LoginResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          this.saveSession(response);
          this.router.navigate(['/home']); // Redirect to home page after login
        })
      );
  }

  signup(name: string, email: string, password: string) {
    return this.httpClient
      .post<LoginResponse>(`${this.apiUrl}/register`, { name, email, password })
      .pipe(
        tap((response) => {
          this.saveSession(response);
          this.router.navigate(['/home']); // Redirect to home page after signup
        })
      );
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['/login']); // Redirect to login page after logout
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('auth-token');
  }

  private saveSession(response: LoginResponse): void {
    sessionStorage.setItem('auth-token', response.token);
    sessionStorage.setItem('username', response.name);

    // Verifies if  the 'role' is present and stores on sessionStorage
    const role = response.role ?? 'user';  // if the roles is not defined, 'user' is defined as a default role
    sessionStorage.setItem('role', role);
  }

  private clearSession(): void {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
  }
}
