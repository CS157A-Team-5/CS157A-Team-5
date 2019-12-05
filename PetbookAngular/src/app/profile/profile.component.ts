import { Component, OnInit } from '@angular/core';
import { PetbookService } from '../petbook.service';
import { Pet } from '../petbook.interface';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  pet: Pet;
  treats: Any[];
  pet_id: number;
  currentUserID;

  constructor(private route: ActivatedRoute, private router: Router, private petbookService: PetbookService) {
    this.pet_id = this.route.snapshot.params.id;
    this.currentUserID = +this.petbookService.getCurrentStorageStatus();
    this.getPetInfo();
  }

  getPetInfo() {
    this.petbookService.getPet(this.pet_id).subscribe((data) => {
      this.pet = data;
      this.getTreats();
    });
  }

  getTreats() {
    this.petbookService.getTreatsByPet(this.pet_id).subscribe((data) => {
      this.treats = data;
    });
  }

  editPet() {
    this.petbookService.updatePet(/* Needs to be implemented */this.pet).subscribe(() => {
      this.getPetInfo();
    });
  }

  deletePet() {
    this.petbookService.deletePet(this.pet_id).subscribe(() => {
      this.router.navigateByUrl('/home');
    });
  }

}
