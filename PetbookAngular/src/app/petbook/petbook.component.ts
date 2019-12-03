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
    console.log(this.currentUserID);
    this.clubs = this.petbookService.getClubsByOwner(this.currentUserID);
  }

  getFriendshipSuggestions() {
    const querySuggestionResults = [];
    this.suggestions = [];
    this.petbookService.getOwnerLocation(this.currentUserID)
      .subscribe((res) => {
        for (const pet of this.pets) {
          querySuggestionResults.push(this.petbookService.getFriendshipSuggestions(
            this.currentUserID, String(res), pet.species, (20 / this.pets.length)));
        }
        const sID = new Set();
        combineLatest(querySuggestionResults).subscribe(
          data => {
            data.forEach(pet => {
              (pet as Array<Pet>).forEach(suggest => {
                if (!sID.has(suggest.id)) {
                  this.suggestions.push(suggest);
                }
                sID.add(suggest.id);
              });
            });
          });
      });
  }

  createClub(model: Club) {
    model.size = 1;
    console.log(model);
    this.petbookService.createClub(model, 'home').subscribe((club_id) => {
        this.petbookService.joinClub(this.currentUserID, Number(club_id));
      },
      () => { console.log("Error joining the created club"); },
      () => { location.reload(); }
    );
  }

  updateClub(model: Club) {
    console.log(model);
    const clubToUpdate = this.petbookService.getClub(model.id);
    clubToUpdate.subscribe(
      data => {
        console.log('this is data ', data);
        model.size = data.size;
        this.petbookService.updateClub(model);
      },
      err => {
        console.log(err);
      },
      () => {
        location.reload();
      });
  }

  leaveClub(club: Club) {
    console.log('i got pressed ', club);
    console.log(club.name);
    const res = this.petbookService.getClubsByName(club.name);
    res.subscribe(
      data => {
        console.log('this is the data ', data);
        this.petbookService.leaveClub(this.currentUserID, data[0].id, 'home');
      },
      err => {
        console.log(err);
      },
      () => {
        console.log('http request finished');
        location.reload();
      });

  }

  searchClub() {
    this.router.navigate(['search']);
  }

  createPet(model: Pet) {
    model.owner_id = this.currentUserID;
    this.petbookService.createPet(model);
    this.getPets();
    this.openCreatePanel = !this.openCreatePanel;
    window.alert('You successfully added your new pet ' + model.name);
  }

  updatePet(model: Pet) {
    model.owner_id = this.currentUserID;
    model.id = +model.id;
    this.petbookService.updatePet(model);
    this.getPets();
    this.openUpdatePanel = !this.openUpdatePanel;
    window.alert('You successfully updated your pet ' + model.name);
  }

  deletePet(model: Pet) {
    this.petbookService.deletePet(+model.id);
    this.getPets();
    this.openDeletePanel = !this.openDeletePanel;
    window.alert('You successfully removed your pet ' + model.name);
  }

}
