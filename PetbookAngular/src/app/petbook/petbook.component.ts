import { Component, OnInit } from '@angular/core';
import { PetbookService } from '../petbook.service';
import { Pet } from '../petbook.interface';

@Component({
  selector: 'app-petbook',
  templateUrl: './petbook.component.html',
  styleUrls: ['./petbook.component.css'],
  providers: [PetbookService],
})
export class PetbookComponent implements OnInit {
  pets: Pet[];

  constructor(private petbookService: PetbookService) { 
    this.getPets();
  }

  ngOnInit() {
  }

  getPets() {
  	this.petbookService.getPets().subscribe((res: Pet[])=>{
    	this.pets = res;
		console.log(this.pets);
	});
  }

  submitPet(model: Pet) {
  	this.petbookService.createPet(model);
  }

}
