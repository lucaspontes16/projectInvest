
//pagina de controle de logica para o enviar as requisicoes e pegar o retorno do backend e salvar o token do usuario

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { LoginResponse } from '../types/login-response.type';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = "http://localhost:8080/auth"

  constructor(private httpClient: HttpClient, private router: Router) { }

  login(email: string, password: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/login", { email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
         this.router.navigate(['/home']); // Redirect to home page after login
      })
    )
  }

  signup(name: string, email: string, password: string){
    return this.httpClient.post<LoginResponse>(this.apiUrl + "/register", { name, email, password }).pipe(
      tap((value) => {
        sessionStorage.setItem("auth-token", value.token)
        sessionStorage.setItem("username", value.name)
         this.router.navigate(['/home']); // Redirect to home page after login
      })
    )
  }
  logout(): void {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('username');
    this.router.navigate(['/login']); // Redirect to login page after logout
  }

  isAuthenticated(): boolean {
    return !!sessionStorage.getItem('auth-token');
  }
}