import { Component } from '@angular/core';
import { PetbookService } from '../petbook.service';
import { Pet, Club, Owner } from '../petbook.interface';
import { combineLatest, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-petbook',
  templateUrl: './petbook.component.html',
  styleUrls: ['./petbook.component.css'],
  providers: [PetbookService],
})
export class PetbookComponent {
  pets: Pet[];
  friends: [Pet[]];
  clubs: Observable<any[]>;
  suggestions: Pet[];
  currentUserID;
  openCreatePanel = false;
  openUpdatePanel = false;
  openDeletePanel = false;

  constructor(private router: Router, private petbookService: PetbookService) {
    this.currentUserID = +this.petbookService.getCurrentStorageStatus();
    this.getPets();
  }

  getPets() {
    this.petbookService.getPetsByOwner(this.currentUserID)
      .subscribe((res: Pet[]) => {
        this.pets = res;
        console.log(this.pets);
        this.getFriends();
        this.getClubs();
        this.getFriendshipSuggestions();
      });
  }

  getFriends() {
    const queryFriendsResults = [];
    for (const pet of this.pets) {
      queryFriendsResults.push(this.petbookService.getFriendsByPet(pet.id));
    }
    combineLatest(queryFriendsResults).subscribe((friendResults: [Pet[]]) => {
      this.friends = friendResults;
      console.log(this.friends);
    });
  }

  getClubs() {
    this.clubs = this.petbookService.getClubsByOwner(this.currentUserID);
  }

  getFriendshipSuggestions() {
    this.suggestions = [];
    const querySuggestionResults = [];
    const species_count = {};
    let max_species = '';
    let max_count = -1;
    this.pets.forEach((p) => {
      species_count[p.species] = 1 + (species_count[p.species] ? species_count[p.species] : 0);
    });
    for (var species in species_count) {
      if (species_count[species] > max_count) {
        max_count = species_count[species]
        max_species = species;
      }
    }
    console.log("Most owned species is: " + max_species);
    this.petbookService.getOwnerLocation(this.currentUserID)
      .subscribe((res) => {
        this.petbookService.getFriendshipSuggestions(this.currentUserID, String(res), max_species, 20)
        .subscribe((data) => {
            data.forEach(suggest => {
              this.suggestions.push(suggest);
            });
        });
    });
  }

  createClub(model: Club) {
    model.size = 1;
    this.petbookService.createClub(model, 'home').subscribe((club_id) => {
        this.petbookService.joinClub(this.currentUserID, Number(club_id)).subscribe(() => {
            this.getClubs();
          },
          (err) => { console.log(err); }
        );
      },
      (err) => { console.log(err); }
    );
  }

  updateClub(model: Club) {
    this.petbookService.getClub(model.id).subscribe(
      data => {
        model.size = data.size;
        this.petbookService.updateClub(model).subscribe(() => {
          this.getClubs();
        },
        (err) => { console.log(err); }
      );
      },
      (err) => { console.log(err); }
    );
  }

  leaveClub(club: Club) {
    this.petbookService.leaveClub(this.currentUserID, club.id, 'home').subscribe(() => {
      this.getClubs();
    });
  }

  searchClub() {
    this.router.navigate(['search']);
  }

  createPet(model: Pet) {
    model.owner_id = this.currentUserID;
    this.petbookService.createPet(model).subscribe(() => {
        this.getPets();
      },
      (err) => { console.log(err); }
    );
  }

  updatePet(model: Pet) {
    model.owner_id = this.currentUserID;
    model.id = +model.id;
    this.petbookService.updatePet(model).subscribe(() => {
        this.getPets();
      },
      (err) => { console.log(err); }
    );
  }

  deletePet(model: Pet) {
    this.petbookService.deletePet(model.id).subscribe(() => {
        this.getPets();
      },
      (err) => { console.log(err); }
    );
  }

}
