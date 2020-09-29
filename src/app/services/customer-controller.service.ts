import { LoginService } from 'src/app/services/login.service';
import { Coupon } from './../Modules/coupon';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../Modules/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerControllerService {

  isAuthenticate:boolean = false;

  auth:string = sessionStorage.getItem('auth2oCu');



  constructor(private http:HttpClient,private loginService:LoginService) { }

  public authenticateCheck(type:boolean){
    if(type === true && this.loginService.getUserType() === 'customer'){
      this.isAuthenticate = true;
      sessionStorage.setItem('auth2oCu','3ag4s');
    }else{
      this.isAuthenticate = false;
    }
  }

  purchaseCoupon(token:string, coupon:Coupon):Observable<any>{
    return this.http.post("http://localhost:8080/customer/purchase/" + token, coupon,{observe:"response",responseType:"text"});
  }

  findCustomerCoupons(token:string){
    return this.http.get<Coupon[]>("http://localhost:8080/customer/find/all/coupons/" + token);
  }

  findCustomerCouponsByCategory(category:string,token:string){
    return this.http.get<Coupon[]>("http://localhost:8080/customer/find/all/coupons/cat/" + category + "/" + token);
  }

  findCustomerCouponsByPrice(token:string, price:number){
    return this.http.get<Coupon[]>("http://localhost:8080/customer/find/all/coupons/price/" + price + "/" + token);
  }

  getCustomerDetails(token:string){
    return this.http.get<Customer>("http://localhost:8080/customer/info/"+token);
  }








}
