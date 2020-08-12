import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private LoginService:LoginService) { }

  userType:string = null;

  admin:boolean;

  company:boolean;

  customer:boolean;


 
  

  ngOnInit(): void {
    
    switch (this.userType) {

        case "admin":
          this.admin == true;
        break;
        case "company":
        this.company == true;
        break;
        case "customer":
        this.customer == true;
        break;
    
      default:

        break;
    }

  


    this.userType = this.LoginService.getUserType();
    
    
  }

  

}
