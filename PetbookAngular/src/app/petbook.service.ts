import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Owner, Pet, Club } from './petbook.interface';
import { map } from 'rxjs/operators';

/* All get calls will usually only require id.
 * All post calls should have the interface saturated except id.
 * All put calls should have the interface attributes that are changed by the respective update.
 * Exceptions will have specified type annotations.
 */

@Injectable()
export class PetbookService {
  constructor(private http: HttpClient, private router: Router) { }
  url = 'http://localhost:3000/api/';

  getOwnerLogin(data: Owner, returnURL?: string): Observable<Owner> {
    console.log('Success');
    return this.http.get<Owner>((this.url + 'user/login'), { params: { email: String(data.email), password: data.password } })
      .pipe(map(userDetails => {
        localStorage.setItem('currentUserID', userDetails.id.toString());
        return userDetails;
      }));
  }

	getOwnerLocation(owner_id: string) {
		return this.http.get(this.url + 'user/location/' + owner_id);
	}

  getCurrentStorageStatus(): string {
    return localStorage.getItem('currentUserID');
  }

  isLoggedIn(): boolean {
    if (this.getCurrentStorageStatus() != null) {
      return true;
    }
    return false;
  }

  logOutUser() {
    localStorage.removeItem('currentUserID');
  }

  createOwner(data: Owner, returnURL?: string) {
    this.http.post((this.url + 'user/create'), data).subscribe(
      res => {
        console.log('Created ' + data);
        if (returnURL !== undefined) {
          this.router.navigateByUrl(returnURL);
        }
      },
      err => {
        console.log('Error: ', err);
      }
    );
  }

  getPetsByOwner(ownerID: number): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.url + 'user/pets/' + ownerID)
  }

  getPet(petID: number, returnURL?: string): Observable<Pet> {
    return this.http.get<Pet>((this.url + 'pets/id/' + petID));
  }

  getPetsByName(name: string): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.url + 'pets/name/' + name);
  }

  getPetsByLocation(location: string): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.url + 'pets/location/' + location);
  }

  getPetsByClub(clubID: number): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.url + 'pets/club/' + clubID);
  }

  getPetsByPark(parkID: number): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.url + 'pets/park/' + parkID);
  }

  getPetsBySpecies(species: string): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.url + 'pets/species/' + species);
  }

  createPet(data: Pet, returnURL?: string) {
    return this.http.post((this.url + 'pets'), data);
  }

  updatePet(data: Pet, returnURL?: string) {
    return this.http.put(this.url + 'pets', data);
  }

  deletePet(petID: number, returnURL?: string) {
    return this.http.delete(this.url + 'pets/' + petID);
  }

  getClub(clubID: number): Observable<Club> {
    return this.http.get<Club>((this.url + 'clubs/id/' + clubID));
  }

  getClubsByName(name: string): Observable<Club[]> {
    return this.http.get<Club[]>(this.url + 'clubs/name/' + name);
  }

  getClubsByOwner(ownerID: string): Observable<Club[]> {
    return this.http.get<Club[]>(this.url + 'clubs/owner/' + ownerID);
  }

  joinClub(ownerID: number, clubID: number, returnURL?: string) {
    return this.http.post((this.url + 'clubs/join'), { owner_id: String(ownerID), club_id: String(clubID) });
  }

  leaveClub(ownerID: number, clubID: number, returnURL?: string) {
    return this.http.post((this.url + 'clubs/leave'), { owner_id: String(ownerID), club_id: String(clubID) });
  }

  createClub(data: Club, returnURL: string) {
    return this.http.post((this.url + 'clubs'), data);
  }

  updateClub(data: Club, returnURL?: string) {
    return this.http.put(this.url + 'clubs', data);
  }

  deleteClub(clubID: number, returnURL?: string) {
    this.http.delete(this.url + 'clubs/' + clubID).subscribe(
      res => {
        console.log('Deleted ' + clubID);
        if (returnURL !== undefined) {
          this.router.navigateByUrl(returnURL);
        }
      },
      err => {
        console.log('Error: ', err);
      }
    );
  }

  getFriendsByPet(petID: number): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.url + 'friendships/' + petID);
  }

  getFriendshipValid(pet1ID: number, pet2ID: number): Observable<number> {
    return this.http.get<number>((this.url + 'friendships'),
      { params: { pet1_id: String(pet1ID), pet2_id: String(pet2ID) } });
  }

  addFriendship(pet1ID: number, pet2ID: number, returnURL?: string) {
    return this.http.post((this.url + 'friendships'), { pet1_id: String(pet1ID), pet2_id: String(pet2ID) });
  }

  deleteFriendship(pet1ID: number, pet2ID: number, returnURL?: string) {
    return this.http.delete((this.url + 'friendships/'), { params: { pet1_id: String(pet1ID), pet2_id: String(pet2ID) }});
  }

	getFriendshipSuggestions(owner_id: number, location: string, species: string, count: number): Observable<Pet[]> {
    return this.http.get<Pet[]>((this.url + 'suggestions'),
      { params: { location: location, species: species, owner_id: String(owner_id), count: String(count) } });
  }

  getTreatsByPet(petID: number): Observable<any[]> {
    return this.http.get<any[]>((this.url + 'treats/pet/' + petID));
  }

  getNewTreats(petID: number): Observable<any[]> {
    return this.http.get<any[]>((this.url + 'treats/new/' + petID));
  }

  addTreat(petID: number, treatID: number) {
    return this.http.post<any[]>((this.url + 'treats/'),
      { pet_id: String(petID), treat_id: String(treatID) });
  }
}
