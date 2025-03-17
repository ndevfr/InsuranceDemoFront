import { Component } from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Role } from '../../models/role.model';

@Component({
  selector: 'app-header',
    imports: [
        RouterLink,
        RouterLinkActive
    ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private authService: AuthService, private router: Router) { }

  handleLogout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.authService.clean();
        this.router.navigate(['/']);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  get isAdmin(): boolean {
    return this.authService.getUser().role === Role.ADMIN;
  }

}
