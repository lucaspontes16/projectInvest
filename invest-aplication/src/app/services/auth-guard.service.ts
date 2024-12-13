import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const authToken = sessionStorage.getItem('auth-token');
    const userRole = sessionStorage.getItem('role'); // Role storage after login

    // Verifies if the route needs a role 
    const requiredRole = next.data['role'];

    if (authToken) {
      // if token exits 
      if (requiredRole) {
        // verify if the role matche withe user role
        if (userRole === requiredRole) {
          return true;
        } else {
          // If role doe not matches 
          this.router.navigate(['/home']); 
          return false;
        }
      }
      return true; // If role is not required 
    } else {
      // If token does not exists go to the home page 
      return this.router.parseUrl('/login');
    }
  }
}
