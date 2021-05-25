import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {Location} from "@angular/common";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router,private location: Location) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('loggedIn') === 'true') {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
       // this.router.navigate(['/loginadmin'], { queryParams: { returnUrl: state.url }});
       this.location.replaceState('/');
       this.router.navigate(['/register']);

        return false;
    }
}
