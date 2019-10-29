import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Owner } from '../petbook.interface';
import { Router } from '@angular/router';
import { PetbookService } from '../petbook.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  /**
   * Form to enter all new submission input, with some validators
   * for required inputs.
   */
  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private petbookService: PetbookService) {}

  /**
   * Validate input, create a new submission, add it to the database, and notify of success.
   */
  onSubmit(): void {
    if (!this.registrationForm.valid) {
      alert('Please fill out all form boxes.');
      return;
    }

    const formValue = this.registrationForm.value;
    const newOwner: Owner = {
      id: 0,
      email: formValue.email,
      password: formValue.password,
      name: formValue.name,
      location: formValue.location
    };

    this.petbookService.createOwner(newOwner, 'login');
    // Need to fix routing to login post createOwner(), temporarily reroute to login

    this.routeToLoginPage();
  }

  routeToLoginPage(): void {
    this.router.navigate(['login']);
  }
}
