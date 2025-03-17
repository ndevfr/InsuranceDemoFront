import { Component } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  content?: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {

  }
}
