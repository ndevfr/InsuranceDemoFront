import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanActivateFn,
  CanDeactivate,
  Route,
  Router, RouterStateSnapshot, UrlSegment, UrlTree
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Role } from './models/role.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean {
    const requiredRoles = route.data['roles'] as Role[];

    if (this.authService.hasRole(requiredRoles)) {
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }
}
