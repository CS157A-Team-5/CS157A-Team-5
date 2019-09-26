import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pet } from './petbook.interface';

@Injectable()
export class PetbookService { 
	constructor(private http: HttpClient, private router: Router) { }
	url = 'http://localhost:3000/api';
	pets: Pet[];
	
	getPets(): Observable<Pet[]> {
		return this.http.get<Pet[]>(this.url)
	}
	
	createPet(data) {
		this.http.post(this.url, data).subscribe(
			res => {
				console.log("Created " + res);
				// this.router.navigateByUrl('/');
			},
			err => {
				console.log('Error: ', err);
			}
		);
	}

	updatePet(data) {
		this.http.put(this.url, data).subscribe(
			res => {
				console.log("Updated " + res);
			},
			err => {
				console.log('Error: ', err);
			}
		);
	}

	deletePet(data) {
		this.http.delete(this.url, data).subscribe(
			res => {
				console.log("Deleted " + res);
			},
			err => {
				console.log('Error: ', err);
			}
		);
	}
}