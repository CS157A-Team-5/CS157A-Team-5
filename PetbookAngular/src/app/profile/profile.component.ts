import { Component, OnInit } from '@angular/core';
import { PetbookService } from '../petbook.service';
import { Pet } from '../petbook.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  pet: Pet;
  treats: any[];
  allTreats: any[];
  pet_id: number;
  editing;
  currentUserID;
  currentUserPets: Pet[];

  constructor(private route: ActivatedRoute, private router: Router, private petbookService: PetbookService) {
    this.editing = false;
    this.pet_id = this.route.snapshot.params.id;
    this.currentUserID = +this.petbookService.getCurrentStorageStatus();
    this.petbookService.getPetsByOwner(this.currentUserID).subscribe((data) => {
      this.currentUserPets = data;
    });
    this.getPetInfo();
  }

  getPetInfo() {
    this.petbookService.getPet(this.pet_id).subscribe((data) => {
      this.pet = data;
      this.getTreats();
      this.currentUserPets.forEach((p) => {
        this.checkFriends(p, this.pet);
      });
      console.log(this.pet_id);
    });
  }

  getTreats() {
    this.petbookService.getTreatsByPet(this.pet_id).subscribe((data) => {
      this.treats = data;
      this.getAllTreats();
    });
  }

  getAllTreats() {
    this.petbookService.getNewTreats(this.pet_id).subscribe((data) => {
      this.allTreats = data;
    });
  }

  addTreat(treatID) {
    this.petbookService.addTreat(this.pet_id, treatID).subscribe(() => {
      this.getTreats();
    });
  }

  editPet(model) {
    model.id = this.pet_id;
    model.name = model.name ? model.name : this.pet.name;
    model.species = model.species ? model.species : this.pet.species;
    model.age = model.age ? model.age : this.pet.age;
    model.weight = model.weight ? model.weight : this.pet.weight;
    this.petbookService.updatePet(model).subscribe(() => {
      this.editing = false;
      this.getPetInfo();
    });
  }

  deletePet() {
    this.petbookService.deletePet(this.pet_id).subscribe(() => {
      this.router.navigateByUrl('/home');
    });
  }

  onConnect(currentPet: Pet, petToFriend: Pet) {
    console.log('Pets to friend ', currentPet, petToFriend);
    this.petbookService.addFriendship(currentPet.id, petToFriend.id).subscribe(() => {
      currentPet.isDisabled = true;
    });
  }

  onDisconnect(currentPet: Pet, petToFriend: Pet) {
    console.log('Pets to friend ', currentPet, petToFriend);
    this.petbookService.deleteFriendship(currentPet.id, petToFriend.id).subscribe(() => {
      currentPet.isDisabled = false;
    });
  }

  checkFriends(currentPet: Pet, petToFriend: Pet) {
    this.petbookService.getFriendshipValid(currentPet.id, petToFriend.id).subscribe((friends) => {
      currentPet.isDisabled = !!friends;
    });
  }

}
