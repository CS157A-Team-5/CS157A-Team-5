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

  constructor(private petbookService: PetbookService) {
    this.getPets();
  }

  getPets() {
    this.petbookService.getPetsByName('S')
      .subscribe((res: Pet[]) => {
        this.pets = res;
        console.log(this.pets);
        this.getFriends();
      });
  }

  getFriends() {
    const queryFriendsResults = [];
    for (const pet of this.pets) {
      queryFriendsResults.push(this.petbookService.getFriendsByPet(pet.id));
    }

    this.friends = combineLatest(queryFriendsResults);
  }

  createPet(model: Pet) {
    console.log(model);
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
