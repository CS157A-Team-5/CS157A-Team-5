import { Component } from '@angular/core';
import { PetbookService } from '../petbook.service';
import { Pet } from '../petbook.interface';
import { forkJoin, combineLatest, Observable } from 'rxjs';

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
  currentUserID;
  openCreatePanel = false;
  openUpdatePanel = false;
  openDeletePanel = false;

  constructor(private petbookService: PetbookService) {
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
    this.clubs = this.petbookService.getClubsByOwner(this.currentUserID);
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
