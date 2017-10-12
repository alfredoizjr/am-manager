import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private auth:AuthService,private route:Router){}

  canActivate():Observable<Boolean> {
    return this.auth.user$.switchMap(user => this.auth.currentUserIsAdmin(user.uid))
    .map(user =>{
      if(user.role === 'admin') return true;
        this.route.navigate(['']);
        return false;
     });

  }
}
