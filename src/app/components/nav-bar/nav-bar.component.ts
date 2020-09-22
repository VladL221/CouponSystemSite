import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private LoginService:LoginService,private route:Router) { }

  userType:string = null;

  admin:boolean;

  company:boolean;

  customer:boolean;


 
  

  ngOnInit(): void {
    this.userType = this.LoginService.getUserType();

    // switch (this.userType) {

    //     case "admin":
    //       this.admin == true;
    //     break;
    //     case "company":
    //     this.company == true;
    //     break;
    //     case "customer":
    //     this.customer == true;
    //     break;
    
    //   default:

    //     break;
    // }

  



    
    
  }


  

}
