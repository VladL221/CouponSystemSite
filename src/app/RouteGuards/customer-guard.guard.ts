import { CustomerControllerService } from 'src/app/services/customer-controller.service';
import { LoginService } from 'src/app/services/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuardGuard implements CanActivate {

  constructor(private loginService:LoginService,private route:Router,private customerService:CustomerControllerService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean{
      if(sessionStorage.getItem('auth2oCu') === '3ag4s'){
        return true;
      }else{
      alert("Not authorized to visit this page");
      this.route.navigateByUrl('/home'); 
  return false;
    }
   
  }
  
}
