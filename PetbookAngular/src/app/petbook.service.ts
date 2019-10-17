import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Owner, Pet, Club, Park, Treat, Pet_Pet } from './petbook.interface';

/* All get calls will usually only require id to be assigned in the interface.
 * All post calls should have the interface saturated except id.
 * All put calls should have the interface attributes that are changed by the respective update.
 * Exceptions will have specified type annotations.
 */

@Injectable()
export class PetbookService { 
	constructor(private http: HttpClient, private router: Router) { }
	url = 'http://localhost:3000/api/';
	pets: Pet[];
	
	getOwnerLogin(data: Owner, returnURL: String): Observable<Owner> {
		return this.http.get<Owner>(this.url + 'user/login');
	}

	createOwner(data: Owner) {
		this.http.post((this.url + 'user/create'), data).subscribe(
			res => {
				console.log("Created " + data);
				if (returnURL !== undefined)
					this.router.navigateByUrl(returnURL);
			},
			err => {
				console.log('Error: ', err);
			}
		);
	}

	getPetsByOwner(data: Owner): Observable<Pet[]> {
		return this.http.get<Pets[]>(this.url + 'user/pets')
	}

	getPet(data: Pet, returnURL: String): Observable<Pet> {
		return this.http.get<Pet>(this.url + 'pets');
	}
	
	getPetsByName(name: String): Observable<Pet[]> {
		return this.http.get<Pet[]>(this.url + 'pets/' + name);
	}

	createPet(data: Pet, returnURL: String) {
		this.http.post((this.url + 'pets'), data).subscribe(
			res => {
				console.log("Created " + data);
				if (returnURL !== undefined)
					this.router.navigateByUrl(returnURL);
			},
			err => {
				console.log('Error: ', err);
			}
		);
	}

	updatePet(data: Pet, returnURL: String) {
		this.http.put(this.url + 'pets', data).subscribe(
			res => {
				console.log("Updated " + data);
				if (returnURL !== undefined)
					this.router.navigateByUrl(returnURL);
			},
			err => {
				console.log('Error: ', err);
			}
		);
	}

	deletePet(data: Pet, returnURL: String) {
		this.http.delete(this.url + 'pets', data).subscribe(
			res => {
				console.log("Deleted " + data);
				if (returnURL !== undefined)
					this.router.navigateByUrl(returnURL);
			},
			err => {
				console.log('Error: ', err);
			}
		);
	}

	getClub(data: Club, returnURL: String): Observable<Club> {
		return this.http.get<Pet>(this.url + 'clubs');
	}
	
	getClubsByName(name: String): Observable<Club[]> {
		return this.http.get<Pet[]>(this.url + 'clubs/' + name);
	}

	createClub(data: Club, returnURL: String) {
		this.http.post((this.url + 'clubs'), data).subscribe(
			res => {
				console.log("Created " + data);
				if (returnURL !== undefined)
					this.router.navigateByUrl(returnURL);
			},
			err => {
				console.log('Error: ', err);
			}
		);
	}

	updateClub(data: Club, returnURL: String) {
		this.http.put(this.url + 'clubs', data).subscribe(
			res => {
				console.log("Updated " + data);
				if (returnURL !== undefined)
					this.router.navigateByUrl(returnURL);
			},
			err => {
				console.log('Error: ', err);
			}
		);
	}

	deleteClub(data: Club, returnURL: String) {
		this.http.delete(this.url + 'clubs', data).subscribe(
			res => {
				console.log("Deleted " + data);
				if (returnURL !== undefined)
					this.router.navigateByUrl(returnURL);
			},
			err => {
				console.log('Error: ', err);
			}
		);
	}

	getFriendsByPet(pet_id: Number): Observable<Pet[]> {
		return this.http.get<Pet>(this.url + 'friendships/' + pet_id);
	}

	getFriendship(pet1_id: Number, pet2_id: Number): Observable<Boolean> {
		return this.http.get<Pet>(this.url + 'friendships');
	}

	addFriendship(pet1_id: Number, pet2_id: Number, returnURL: String) {
		this.http.post((this.url + 'friendships'), {pet1_id: this.pet1_id, pet2_id: this.pet2_id}).subscribe(
			res => {
				console.log("Created friendship: " + pet1_id + " and " + pet2_id);
				if (returnURL !== undefined)
					this.router.navigateByUrl(returnURL);
			},
			err => {
				console.log('Error: ', err);
			}
		);
	}

	deleteFriendship(pet1_id: Number, pet2_id: Number, returnURL: String) {
		this.http.delete((this.url + 'friendships'), {pet1_id: this.pet1_id, pet2_id: this.pet2_id}).subscribe(
			res => {
				console.log("Removed friendship: " + pet1_id + " and " + pet2_id);
				if (returnURL !== undefined)
					this.router.navigateByUrl(returnURL);
			},
			err => {
				console.log('Error: ', err);
			}
		);
	}
}
