import { Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Owner } from '../petbook.interface';
import { Router } from '@angular/router';
import { PetbookService } from '../petbook.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private petbookService: PetbookService) { }
  

  /**
   * Triggers authentication check of user email and password
   */
  login(): void {
    if(!this.loginForm.valid) {
      alert('Please fill out all form boxes');
    }

    const formValue = this.loginForm.value;
    const owner: Owner = {
      id: 0,
      email: formValue.email,
      password: formValue.password,
      name: '',
      location: ''
    }


    const res = this.petbookService.getOwnerLogin(owner, '');

    res.subscribe(
    data=> {
      console.log("this is the data ", data);
    },
    err =>{
      console.log(err);
    },
    ()=>{
      console.log("http request finished");
      this.router.navigate(['/']);
    }
    );
  }

  /**
   * Register new user routes to a new page for registration
   */
  register() {
    this.router.navigate(['registration']);
  }

}
