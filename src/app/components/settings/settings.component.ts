import { CompanyControllerService } from './../../services/company-controller.service';
import { CustomerControllerService } from './../../services/customer-controller.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from 'src/app/Modules/customer';
import { Company } from 'src/app/Modules/company';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {


  customer:Customer;
  company:Company;
  comp:boolean = false;
  cust:boolean = false;

  constructor(private customerService:CustomerControllerService, private companyService:CompanyControllerService) { }

  ngOnInit(): void {
    if(sessionStorage.getItem('userType') === 'company'){
      this.companyService.companyDetails(sessionStorage.getItem('userToken')).subscribe((res)=>{
        console.log(res);
        this.company = res;
        this.comp = true;
      },(err)=>{
        console.log(err);
      });
    }else if(sessionStorage.getItem('userType') === 'customer'){
      this.customerService.getCustomerDetails(sessionStorage.getItem('userToken')).subscribe((res)=>{
        console.log(res);
        this.customer = res;
        this.cust = true;
      },(err)=>{
        console.log(err);
      });

    }

  }
  change(){
    //would send a request to the server and check if the email already exist and if the password is strong enough.
  }





}
