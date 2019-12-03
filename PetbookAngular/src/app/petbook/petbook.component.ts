import { Component } from '@angular/core';
import { PetbookService } from '../petbook.service';
import { Pet, Club, Owner } from '../petbook.interface';
import { forkJoin, combineLatest, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-petbook',
  templateUrl: './petbook.component.html',
  styleUrls: ['./petbook.component.css'],
  providers: [PetbookService],
})
export class PetbookComponent {
  pets: Pet[];
  friends: Observable<any[]>;
  clubs: Observable<any[]>;
  suggestions: Observable<Pet[]>;
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
    this.friends = combineLatest(queryFriendsResults);
  }

  getClubs() {
    console.log(this.currentUserID);
    this.clubs = this.petbookService.getClubsByOwner(this.currentUserID);
    console.log(this.clubs.length);
  }

  getFriendshipSuggestions() {
    const querySuggestionResults = [];
    let location = '';
    this.petbookService.getOwnerLocation(this.currentUserID)
      .subscribe((res: Owner) => {
        location = res.location;
      },
      () => {},
      () => {
        for (const pet of this.pets) {
          querySuggestionResults.push(this.petbookService.getFriendshipSuggestions(
            this.currentUserID,
            location,
            pet.species));
        }
        this.friends = combineLatest(querySuggestionResults);
      });
  }

  createClub(model: Club) {
    model.size = 1;
    console.log(model);
    console.log(model.id);
    this.petbookService.createClub(model, 'home');
    //trying to get the correct id of the club because model.id is not defined so I can't use it
    const res = this.petbookService.getClubsByName(model.name);
    res.subscribe(
    data=> {
      console.log("this is the data ", data);
      this.petbookService.joinClub(this.currentUserID, data[data.length - 1].id, 'home');
    },
    err =>{
      console.log(err);
    },
    ()=>{
      console.log("http request finished");
      this.router.navigate(['home']);
    });
  }

  updateClub(model: Club) {
    console.log(model);
    const clubToUpdate = this.petbookService.getClub(model.id);
    clubToUpdate.subscribe(
      data=> {
        console.log("this is data ", data);
        model.size = data.size;
        this.petbookService.updateClub(model);
      },
      err =>{
        console.log(err);
      }
    )

  }

  leaveClub(club: Club) {
    console.log("i got pressed ", club);
    console.log(club.name);
    const res = this.petbookService.getClubsByName(club.name);
    res.subscribe(
    data=> {
      console.log("this is the data ", data);
      this.petbookService.leaveClub(this.currentUserID, data[0].id, 'home');
    },
    err =>{
      console.log(err);
    },
    ()=>{
      console.log("http request finished");
      this.router.navigate(['home']);
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
