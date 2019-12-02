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
    console.log(model);
    model.owner_id = this.currentUserID;
    this.petbookService.createPet(model);
  }

  updatePet(model: Pet) {
    console.log(model);
    this.petbookService.updatePet(model);
  }

  deletePet(model: Pet) {
    console.log(model);
    this.petbookService.deletePet(100);
  }

}
