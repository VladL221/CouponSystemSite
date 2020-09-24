import { LoginService } from 'src/app/services/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyGuardGuard implements CanActivate {

  constructor(private loginService:LoginService,private route:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(this.loginService.isAuthenticate === true && this.loginService.getUserType() === "company")
    return true;
    else
    alert("Not authorized to visit this page");
        this.route.navigateByUrl('/home'); 
    return false;
  }
  
}
