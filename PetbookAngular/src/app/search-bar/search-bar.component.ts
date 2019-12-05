import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PetbookService } from '../petbook.service';
import { Pet, Club } from '../petbook.interface';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent {

  searchForm = new FormGroup({
    searchTerm: new FormControl('', [Validators.required]),
  });

  pets: Pet[];
  petsAtLocation: Observable<Pet[]>;
  clubs: Observable<Club[]>;
  petsBySpecies: Observable<Pet[]>;
  currentUserID: number;
  currentUserPets: Observable<Pet[]>;
  visited: Set<Number>;

  constructor(private petService: PetbookService, private router: Router) {
    this.currentUserID = +this.petService.getCurrentStorageStatus();
    this.visited = new Set();
  }

  onSearch() {
    if (!this.searchForm.valid) {
      alert('Please enter in a search.');
      return;
    }
    this.pets = [];
    const parsePets = (data) => {
      data.forEach((pet) => {
        if (!this.visited.has(pet.id)) {
          this.visited.add(pet.id);
          this.pets.push(pet);
        }
      });
    }

    const term = this.searchForm.value.searchTerm;

    this.petService.getPetsByName(term).subscribe((data) => {
      parsePets(data);
    });
    this.petService.getPetsByLocation(term).subscribe((data) => {
      parsePets(data);
    });
    this.petService.getPetsBySpecies(term).subscribe((data) => {
      parsePets(data);
    });
    this.clubs = this.petService.getClubsByName(term);

    console.log('Search successful');
  }

  onJoin(clubToJoin: Club) {
    this.petService.joinClub(this.currentUserID, clubToJoin.id).subscribe(() => {},
    (err) => { console.log(err) });
    window.alert('You are now part of the ' + clubToJoin.name + ' club!');
  }

}
