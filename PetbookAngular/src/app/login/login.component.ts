import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  /**
   * Triggers authentication check of user email and password
   */
  login() {

  }

  /**
   * Register new user routes to a new page for registration
   */
  register() {
    this.router.navigate(['registration']);
  }

}
