import { AdminControllerService } from 'src/app/services/admin-controller.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {

  constructor(private adminService:AdminControllerService,private route:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
       if(this.adminService.isAuthenticate === true){
         return true;
       }else{
         alert("Not authorized to visit this page");
        this.route.navigateByUrl('/home');
         return false;
       }
  }
  
}
