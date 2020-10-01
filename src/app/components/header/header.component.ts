import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminControllerService } from 'src/app/services/admin-controller.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService:LoginService,private route:Router,private adminService:AdminControllerService) { }

trans1:string ='';
trans2:string='';
trans3:string='';

  status:boolean = false;
  norm:boolean = true;

  userName:string = "Guest";



  arrow:string;
  expandWidth = '150px';
  expandHeight = '71px';
  ngOnInit(): void {
    this.loginService.currentUserName.subscribe(res => this.userName = res);  
    this.userName = sessionStorage.getItem('userName');
  


  }

  logOut(){
    this.loginService.badLogin();
    this.route.navigateByUrl('home');
    this.userName = 'Guest';
  }


clicked(){
  if(this.userName !== "Guest"){
    if(this.status === false){
      this.status = true;
      this.arrow = 'keyboard_arrow_up';
      this.expandWidth = '250px';
      }
      else{
        this.status = false;
        this.arrow = 'keyboard_arrow_down';
        this.expandWidth = '150px';
      }
  }else{
    null;
  }
}

transform(){
if(this.status === false){
this.status = true;
this.trans1 = 'rotate(-45deg) translate(-9px, 6px)';
this.trans2 = '0';
this.trans3 = 'rotate(45deg) translate(-8px, -8px)';
this.expandWidth = '250px';
this.expandHeight = '200px';
}else{
  this.status = false;
  this.trans1 = '';
  this.trans2 = '';
  this.trans3 = '';
  this.expandWidth = '150px';
  this.expandHeight = '71px';

}
}


panelNav(){
  this.route.navigateByUrl(sessionStorage.getItem('userType'));
}

}


