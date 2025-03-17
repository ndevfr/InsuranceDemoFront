import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarComponent } from '../../components/avatar/avatar.component';

@Component({
  selector: 'app-login',
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, AvatarComponent ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form: any = {
    email: "",
    password: ""
  };
  isLoginFailed = false;
  errorMessage = '';
  email: string = '';
  role: string = '';
  firstname: string = '';
  lastname: string = '';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      const user = this.authService.getUser();
      this.email = user.email;
      this.role = user.role;
      this.firstname = user.firstname;
      this.lastname = user.lastname;
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: data => {
        this.authService.saveUser(data);

        this.isLoginFailed = false;
        const user = this.authService.getUser();
        this.email = user.email;
        this.role = user.role;
        this.firstname = user.firstname;
        this.lastname = user.lastname;
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  reloadPage(): void {
    window.location.reload();
  }
}
