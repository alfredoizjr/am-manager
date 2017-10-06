import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import 'rxjs/add/operator/map';
//services
import { AuthService } from './../services/auth.service';

@Injectable()
export class IsLoginGuard implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }

  canActivate() {
    return this.auth.user$.map(user => {
      if (user) {
        return true;
      }else{
        return false;
      }
    });

  }
}
