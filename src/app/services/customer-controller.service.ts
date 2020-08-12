import { Coupon } from './../Modules/coupon';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../Modules/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerControllerService {

  constructor(private http:HttpClient) { }

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
