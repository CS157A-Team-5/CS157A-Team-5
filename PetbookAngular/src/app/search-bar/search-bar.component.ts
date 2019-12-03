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

  pets: Observable<Pet[]>;
  petsAtLocation: Observable<Pet[]>;
  clubs: Observable<Club[]>;
  petsBySpecies: Observable<Pet[]>;
  currentUserID: number;
  currentUserPets: Observable<Pet[]>;

  constructor(private petService: PetbookService, private router: Router) {
    this.currentUserID = +this.petService.getCurrentStorageStatus();
    this.currentUserPets = this.petService.getPetsByOwner(this.currentUserID);
  }

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

  onConnect(currentPet: Pet, petToFriend: Pet) {
    console.log('Pets to friend ', currentPet, petToFriend);
    this.petService.addFriendship(currentPet.id, petToFriend.id);
    window.alert(currentPet.name + ' is now friends with ' + petToFriend.name);
  }

  onJoin(clubToJoin: Club) {
    this.petService.joinClub(this.currentUserID, clubToJoin.id);
  }

}
