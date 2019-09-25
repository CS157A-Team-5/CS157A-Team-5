import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class PetbookService { 
	constructor(private http: HttpClient, private router: Router) { }
	url = 'http://localhost:3000/pets';
	
	getPets(): Observable<Object> {
		return this.http.get(this.url);
	}
	
	createPet(data) {
		this.http.post(this.url, data).subscribe(
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