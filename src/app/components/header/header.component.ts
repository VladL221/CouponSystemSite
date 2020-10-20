import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminControllerService } from 'src/app/services/admin-controller.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private loginService:LoginService,private route:Router,private adminService:AdminControllerService) { }

  



  userName:string;

  loggedIn:string;



  ngOnInit(): void {
      
      this.loginService.currentUserName.subscribe(res => this.userName = res);
    
  




  }

  logOut(){
    this.loginService.badLogin();
    this.route.navigateByUrl('home');
    this.userName = 'Guest';
  }







panelNav(){
  this.route.navigateByUrl(sessionStorage.getItem('userType'));
}

}


