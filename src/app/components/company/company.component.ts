import { Company } from './../../Modules/company';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CompanyControllerService } from 'src/app/services/company-controller.service';
import { LoginService } from 'src/app/services/login.service';
import { Coupon } from 'src/app/Modules/coupon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  // OUR FORMS
  createCouponForm: FormGroup;
  updateCouponForm: FormGroup;
  findOneForm: FormGroup;
  categoryFilter: FormControl;
  priceFilter: FormControl;
  maxPrice: FormControl;
  categoryType: FormControl;

  // OBJECTS WE USE
  coupon: Coupon;
  oneCoupon: Coupon;
  updatedCoupon: Coupon;
  company: Company;
  coupons: Coupon[];
  filterCoupons: Coupon[];

  // BOOLEAN FOR OPENING UPDATE FORM
  updateCou: Boolean = false;

  constructor(private companyService:CompanyControllerService, private fb:FormBuilder, private snack:MatSnackBar,private loginService:LoginService) { }

  ngOnInit(): void {
    this.createCouponForm = this.fb.group({
      category: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.maxLength(200)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(1)]],
      image: ['', Validators.required]
    });

    this.updateCouponForm = this.fb.group({
      categoryUp: ['', Validators.required],
      titleUp: ['', [Validators.required, Validators.maxLength(100)]],
      descriptionUp: ['', [Validators.required, Validators.maxLength(200)]],
      startDateUp: ['', Validators.required],
      endDateUp: ['', Validators.required],
      amountUp: ['', [Validators.required, Validators.min(1)]],
      priceUp: ['', [Validators.required, Validators.min(1)]],
      imageUp: ['', Validators.required]
    });

    this.findOneForm = this.fb.group({
      couponId: ['', Validators.required]
    });

    // CONTROLS FOR FILTERING COUPONS
    this.categoryFilter = new FormControl("");
    this.priceFilter = new FormControl("");
    this.maxPrice = new FormControl("");
    this.categoryType = new FormControl("");

    // LOAD COUPONS ON FIRST VISIT
    this.companyService.findAllCoupons(this.loginService.getUserToken()).subscribe((coupons)=>{
      this.coupons = coupons;
    });
  }

  // COUPON CREATION
  public createCoupon() {
    const coupon:Coupon = new Coupon(  this.createCouponForm.controls['title'].value, this.createCouponForm.controls['description'].value,
    this.createCouponForm.controls['startDate'].value, this.createCouponForm.controls['endDate'].value, this.createCouponForm.controls['amount'].value,
    this.createCouponForm.controls['price'].value, this.createCouponForm.controls['image'].value,this.createCouponForm.controls['category'].value);
    this.companyService.createCoupon(this.loginService.getUserToken(), coupon).subscribe((res)=>{
      this.snack.open("Coupon created sucessfully " , "", {duration:2000})
      this.ngOnInit();
    }, (err)=>{
      const error:String = err.error;
      alert(error);
    });
  }

  // SEND COUPON TO UPDATE - SEND WITH COUPON DEFAULT VALUES THEN CHANGE WHAT WE NEED WHILE SAVING THE REST AS IS
  public openCouponUpdate(coupon:Coupon) {
    this.updateCou = true;
    this.coupon = coupon;
    this.updateCouponForm.controls['categoryUp'].setValue(coupon.category);
    this.updateCouponForm.controls['titleUp'].setValue(coupon.title);
    this.updateCouponForm.controls['descriptionUp'].setValue(coupon.description);
    this.updateCouponForm.controls['startDateUp'].setValue(coupon.startDate);
    this.updateCouponForm.controls['endDateUp'].setValue(coupon.endDate);
    this.updateCouponForm.controls['amountUp'].setValue(coupon.amount);
    this.updateCouponForm.controls['priceUp'].setValue(coupon.price);
    this.updateCouponForm.controls['imageUp'].setValue(coupon.image);
  }

  // CLOSE UPDATE FORM WITHOUT UPDATING
  public closeCouponUpdate() {
    this.updateCou = false;
  }

  // ACTUAL UPDATE + FORM TO CHANGE WHAT WE NEED TO UPDATE - WHAT WE DONT CHANGE KEEPS DEFAULT VALUES ^^^
  public updateCoupon() {
    this.coupon.category = this.updateCouponForm.controls['categoryUp'].value;
    this.coupon.title = this.updateCouponForm.controls['titleUp'].value;
    this.coupon.description = this.updateCouponForm.controls['descriptionUp'].value;
    this.coupon.startDate = this.updateCouponForm.controls['startDateUp'].value;
    this.coupon.endDate = this.updateCouponForm.controls['endDateUp'].value;
    this.coupon.amount = this.updateCouponForm.controls['amountUp'].value;
    this.coupon.price = this.updateCouponForm.controls['priceUp'].value;
    this.coupon.image = this.updateCouponForm.controls['imageUp'].value;
    this.companyService.updateCoupon(this.loginService.getUserToken(), this.coupon).subscribe((result)=>{
      this.snack.open("Coupon updated sucessfully", "", {duration:2000})
      this.ngOnInit();
      this.updateCou = false;
    }, (err)=>{
      const error:String = err.error;
      alert(error);
    });
  }

  // DELETE COUPON BASED ON ID
  public deleteCoupon(id) {
    this.companyService.deleteCoupon(id, this.loginService.getUserToken()).subscribe((response)=>{
      this.snack.open(response, "", {duration:2000})
      this.ngOnInit();
    }, (err)=>{
      const error:String = err.error;
      alert(error);
    });
  }

  public getOneCoupon() {
    this.companyService.findOneCoupon(this.loginService.getUserToken(), this.findOneForm.controls['couponId'].value).subscribe((coupon)=>{
      this.oneCoupon = coupon;
      this.findOneForm.controls['couponId'].setValue("");
    }, (err)=>{
      this.findOneForm.controls['couponId'].setValue("");
      const error:String = err.error;
      alert(error);
    });
  }

  public findAllCoupons() {
    this.companyService.findAllCoupons(this.loginService.getUserToken()).subscribe((coupons)=>{
      this.coupons = coupons;
    });
  }

  // FILTER BY MAX PRICE 
  public getCouponsByMaxPrice() {
    this.companyService.findAllCouponsByPrice(this.loginService.getUserToken(), this.maxPrice.value).subscribe((result)=>{
      this.filterCoupons = result;
    });
  }

  // FILTER BY CATEGORY
  public getCouponsByCategory() {
    this.companyService.findAllCouponsByCategory( this.categoryType.value,this.loginService.getUserToken()).subscribe((result)=>{
      this.filterCoupons = result;
    },(err)=>{
    });
  }


  public cCouForm() {
    return this.createCouponForm.controls;
  }

  public uCouForm() {
    return this.updateCouponForm.controls;
  }

        
  
}
