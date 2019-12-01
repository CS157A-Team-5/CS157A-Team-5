import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PetbookService } from './petbook.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private petbookService: PetbookService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.petbookService.isLoggedIn()) {
            return true;
        }

        window.alert('You don\'t have permission to view this page. Please log in first.');
        this.router.navigate(['login']);
        return false;
    }
}