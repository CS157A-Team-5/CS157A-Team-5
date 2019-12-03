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
    this.http.post((this.url + 'pets'), data).subscribe(
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

  updatePet(data: Pet, returnURL?: string) {
    this.http.put(this.url + 'pets', data).subscribe(
      res => {
        console.log('Updated ' + data);
        if (returnURL !== undefined) {
          this.router.navigateByUrl(returnURL);
        }
      },
      err => {
        console.log('Error: ', err);
      }
    );
  }

  deletePet(petID: number, returnURL?: string) {
    this.http.delete(this.url + 'pets/' + petID).subscribe(
      res => {
        console.log('Deleted ' + petID);
        if (returnURL !== undefined) {
          this.router.navigateByUrl(returnURL);
        }
      },
      err => {
        console.log('Error: ', err);
      }
    );
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
    this.http.post((this.url + 'clubs/join'), { owner_id: String(ownerID), club_id: String(clubID) }).subscribe(
      res => {
        console.log(ownerID + ' joined club ' + clubID);
        if (returnURL !== undefined) {
          this.router.navigateByUrl(returnURL);
        }
      },
      err => {
        console.log('Error: ', err);
      }
    );
  }

  leaveClub(ownerID: number, clubID: number, returnURL?: string) {
    this.http.post((this.url + 'clubs/leave'), { owner_id: String(ownerID), club_id: String(clubID) }).subscribe(
      res => {
        console.log(ownerID + ' left club ' + clubID);
        if (returnURL !== undefined) {
          this.router.navigateByUrl(returnURL);
        }
      },
      err => {
        console.log('Error: ', err);
      }
    );
  }

  createClub(data: Club, returnURL: string) {
    this.http.post((this.url + 'clubs'), data).subscribe(
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

  updateClub(data: Club, returnURL?: string) {
    this.http.put(this.url + 'clubs', data).subscribe(
      res => {
        console.log('Updated ' + data);
        if (returnURL !== undefined) {
          this.router.navigateByUrl(returnURL);
        }
      },
      err => {
        console.log('Error: ', err);
      }
    );
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
    this.http.post((this.url + 'friendships'), { pet1_id: String(pet1ID), pet2_id: String(pet2ID) }).subscribe(
      res => {
        console.log('Created friendship: ' + pet1ID + ' and ' + pet2ID);
        if (returnURL !== undefined) {
          this.router.navigateByUrl(returnURL);
        }
      },
      err => {
        console.log('Error: ', err);
      }
    );
  }

  deleteFriendship(friendshipID: number, returnURL?: string) {
    this.http.delete((this.url + 'friendships/' + friendshipID)).subscribe(
      res => {
        console.log('Removed friendship: ' + friendshipID);
        if (returnURL !== undefined) {
          this.router.navigateByUrl(returnURL);
        }
      },
      err => {
        console.log('Error: ', err);
      }
    );
  }
}