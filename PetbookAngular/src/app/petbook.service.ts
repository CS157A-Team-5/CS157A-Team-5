import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pet } from './petbook.interface';

@Injectable()
export class PetbookService { 
	constructor(private http: HttpClient, private router: Router) { }
	url = 'http://localhost:3000/api';
	
	getPets(): Observable<Object> {
		return this.http.get(this.url).subscribe((res: Pet[])=>{
            console.log(res);
        });
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