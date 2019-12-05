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

  constructor(private route: ActivatedRoute, private router: Router, private petbookService: PetbookService) {
    this.pet_id = this.route.snapshot.params.id;
    this.currentUserID = +this.petbookService.getCurrentStorageStatus();
    this.getPetInfo();
    this.editing = false;
  }

  getPetInfo() {
    this.petbookService.getPet(this.pet_id).subscribe((data) => {
      this.pet = data;
      this.getTreats();
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

}
