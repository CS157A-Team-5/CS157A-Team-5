import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { PetbookService } from '../petbook.service';
import { Pet } from '../petbook.interface';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  searchForm = new FormGroup({
    searchPet: new FormControl('', [Validators.required]),
  });

  pets;  //: Pet[];    //I had an error when I included : Pet[]

  constructor(private router: Router, private petService: PetbookService) { }

  onSearch() {
    if (!this.searchForm.valid) {
      alert('Please enter in a search.');
      return;
    }

    this.pets = this.petService.getPetsByName(this.searchForm.value.searchPet);

    console.log("Search successful");
  }

}
