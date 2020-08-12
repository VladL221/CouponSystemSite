import { Customer } from './../../Modules/customer';
import { FormBuilder, FormControl } from '@angular/forms';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { CustomerControllerService } from 'src/app/services/customer-controller.service';
import { Coupon } from 'src/app/Modules/coupon';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private LoginService:LoginService,private customerService:CustomerControllerService,private fb:FormBuilder) { }

  categoryFilter: FormControl;
  priceFilter: FormControl;
  maxPrice: FormControl;
  categoryType: FormControl;
  switchForm:number = 0;
  coupon:Coupon;
  coupons:Coupon[];
  couponsMaxPrice:Coupon[];
  CouponsByCategory:Coupon[];
  customer:Customer;
  filterCoupons: Coupon[];
  clicked:boolean = false;


  ngOnInit(): void {

    this.customerService.findCustomerCoupons(this.LoginService.getUserToken()).subscribe((res)=>{
      this.coupons = res;
    },(err)=>{
      alert("You do not have any coupons")
    });
    this.categoryFilter = new FormControl("");
    this.priceFilter = new FormControl("");
    this.maxPrice = new FormControl("");
    this.categoryType = new FormControl("");
    

    this.customerService.getCustomerDetails(this.LoginService.getUserToken()).subscribe((res)=>{
      this.customer = res;
    },(err)=>{
      const error:String = err.error;
      alert(error);
    })
  }



  public getCouponsByMaxPrice() {
    this.customerService.findCustomerCouponsByPrice(this.LoginService.getUserToken(), this.maxPrice.value).subscribe((result)=>{
      this.filterCoupons = result;
    })
  }

  public getCouponsByCategory() {
    this.customerService.findCustomerCouponsByCategory(this.categoryType.value,this.LoginService.getUserToken()).subscribe((result)=>{
      this.filterCoupons = result;
    },(err)=>{
      const error:String = err.error;
      alert(error);
    })
  }


  public showDetails() {
    if(this.clicked === false){

    
  this.clicked = true;
}else{
  this.clicked = false;
}
  }






}
