import { Component, OnInit } from '@angular/core';
import { PetbookService } from '../petbook.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private petbookService: PetbookService, private router: Router) { }

  ngOnInit() {
  }

  logoutUser() {
    this.petbookService.logOutUser();
    this.router.navigate(['login']);
  }

}
