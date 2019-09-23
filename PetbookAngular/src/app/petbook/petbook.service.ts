import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class PetbookService { 
	constructor(private http: HttpClient, private router: Router) { }
	url = 'http://localhost:3000';
	getPets() {
		return this.http.get('${this.url}/pets');
	}
	createPet(data) {
		this.http.post('${this.url}/pets', data).subscribe(
			res => {
				console.log(res);
				this.router.navigateByUrl('/pet');
			},
			err => {
				console.log('Error: ', err);
			}
		);
	}
}