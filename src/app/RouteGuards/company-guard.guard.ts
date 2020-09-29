import { CompanyControllerService } from 'src/app/services/company-controller.service';
import { LoginService } from 'src/app/services/login.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyGuardGuard implements CanActivate {

  constructor(private loginService:LoginService,private route:Router,private companyService:CompanyControllerService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(sessionStorage.getItem('auth2oC') === '1' && sessionStorage.getItem('userType')=== 'company'){
        return true;
        
      }else{
        alert("Not authorized to visit this page");
        this.route.navigateByUrl('/home'); 
    return false;
      }
   
     
    
   
  }

  // private pageRefresh(type:Boolean){
    

  // }
  
}
