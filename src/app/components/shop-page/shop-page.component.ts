import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Coupon } from 'src/app/Modules/coupon';
import { CustomerControllerService } from 'src/app/services/customer-controller.service';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.css']
})
export class ShopPageComponent implements OnInit {



  coupon:Coupon[];
  oneCoupon:Coupon;
  userType:string;
  custCoupons:Coupon[];



  constructor(private loginService:LoginService,private customerService:CustomerControllerService) { }

  ngOnInit(): void {


this.userType = this.loginService.getUserType();
    this.loginService.getAllCoupons().subscribe((res)=>{
      this.coupon = res;
    },(err)=>{
      const error:String = err.error;
      alert(error);
    })

    
  }
  
  
  buyCoupon(buy){
  this.oneCoupon = buy;
    if(this.loginService.getUserType() === "customer"){
      this.customerService.purchaseCoupon(this.loginService.getUserToken(), this.oneCoupon).subscribe((res)=>{
        this.ngOnInit();
      },(err)=>{
        const error:String = err.error;
      alert(error);
      });
    }else{
      alert("Company and admin cannot buy coupon!");
    }

  }

}
