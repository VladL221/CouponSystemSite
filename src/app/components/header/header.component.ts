import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private loginService:LoginService,private route:Router) { }



  userName:string = "Guest";
  
  loggedIn:boolean;

  // userName:string = 



  arrow:string;
  expand = '120px';
  expandHeigth = '73px';
  status:boolean = false;
  transform = '';
  ngOnInit(): void {
    this.loginService.currentUserName.subscribe(res => this.userName = res);
    if(this.userName !== "Guest"){
      this.arrow = 'keyboard_arrow_down';
    }
    

  }

  logOut(){
    this.loginService.badLogin();
    this.route.navigateByUrl('/home');
  }


clicked(){
  if(this.userName !== "Guest"){
    if(this.status === false){
      this.status = true;
      this.arrow = 'keyboard_arrow_up';
      this.expandHeigth = '200px';
      }
      else{
        this.status = false;
        this.arrow = 'keyboard_arrow_down';
        this.expandHeigth = '73px';
      }
  }else{
    null;
  }


}




}
