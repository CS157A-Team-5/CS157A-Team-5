import { Component, OnInit } from '@angular/core';
import { PetbookService } from '../petbook.service';

@Component({
  selector: 'app-petbook',
  templateUrl: './petbook.component.html',
  styleUrls: ['./petbook.component.css'],
  providers: [PetbookService],
})
export class PetbookComponent implements OnInit {
  data;

  constructor(private petbookService: PetbookService) { 
    this.data = petbookService.getPets();
  }

  ngOnInit() {
  }

}
