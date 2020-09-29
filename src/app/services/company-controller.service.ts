import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { Company } from './../Modules/company';
import { Coupon } from './../Modules/coupon';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyControllerService {
  
  isAuthenticate:boolean = false;

  auth:string = sessionStorage.getItem('auth2oC');

  constructor(private http:HttpClient, private loginService:LoginService) { }


  public setAuth(type:boolean){
    this.isAuthenticate = type;
    sessionStorage.setItem('auth2oC','1');
  }

  authCheck(type:boolean){
    if(type === true && this.loginService.getUserType() === 'company'){
      this.setAuth(type);
    }else{
      this.isAuthenticate = false;
    }
  }

  createCoupon(token:string, coupon:Coupon){
    return this.http.post<Coupon>("http://localhost:8080/company/create/coupon/" + token, coupon);
  }

  updateCoupon(token:string, coupon:Coupon):Observable<any>{
    return this.http.put("http://localhost:8080/company/update/coupon/" + token, coupon,{observe:'response',responseType:'text'});
  }

  deleteCoupon(id:number,token:string):Observable<any>{
    return this.http.delete("http://localhost:8080/company/delete/coupon/" + id + "/" + token,{observe:'response',responseType:'text'});
  }

  findAllCoupons(token:string){
    return this.http.get<Coupon[]>("http://localhost:8080/company/find/all/coupons/" + token);
  }

  findOneCoupon(token:string, id:number){
    return this.http.get<Coupon>("http://localhost:8080/company/find/one/coupon/" + id + "/" + token);
  }

  findAllCouponsByCategory(category:string,token:string ){
    return this.http.get<Coupon[]>("http://localhost:8080/company/find/all/coupons/category/" + category + "/" + token);
  }

  findAllCouponsByPrice(token:string, price:number){
    return this.http.get<Coupon[]>("http://localhost:8080/company/find/all/coupons/price/" + price + "/" + token);
  }

  companyDetails(token:string){
    return this.http.get<Company>("http://localhost:8080/company/info/" + token);
  }
}
