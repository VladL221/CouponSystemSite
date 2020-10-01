import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  condition:boolean = false;
  color1:string = "red";

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
      this.loginService.changeUserName(sessionStorage.getItem('userName'));
    
    
  }
change(){
  this.color1 = "green";
}

}
