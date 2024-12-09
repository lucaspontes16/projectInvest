import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    const authToken = sessionStorage.getItem('auth-token');
    const userRole = sessionStorage.getItem('role'); // store the role during the login

    // Verify if the routes requires a specific role 
    const requiredRole = next.data['role'];

    if (authToken) {
      if (requiredRole) {
        // If the route has a role, verifies if the user has the role 
        if (userRole === requiredRole) {
          return true;
        } else {
          alert('Access denied!'); // access denied message 
          this.router.navigate(['/home']); // Redirects to the home page
          return false;
        }
      }
      return true; // if there is no role just makes a token authentication
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
