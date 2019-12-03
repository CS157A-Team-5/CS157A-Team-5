import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { PetbookService } from '../petbook.service';
import { Pet, Club } from '../petbook.interface';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  searchForm = new FormGroup({
    searchTerm: new FormControl('', [Validators.required]),
  });

  pets: Observable<Pet[]>;
  petsAtLocation: Observable<Pet[]>;
  clubs: Observable<Club[]>;
  petsBySpecies: Observable<Pet[]>;

  constructor(private petService: PetbookService) { }

  onSearch() {
    if (!this.searchForm.valid) {
      alert('Please enter in a search.');
      return;
    }

    const term = this.searchForm.value.searchTerm;

    this.pets = this.petService.getPetsByName(term);
    this.petsAtLocation = this.petService.getPetsByLocation(term);
    this.clubs = this.petService.getClubsByName(term);
    this.petsBySpecies = this.petService.getPetsBySpecies(term);

    console.log('Search successful');
  }

}
