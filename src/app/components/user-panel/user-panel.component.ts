import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  constructor(private router:Router,private loginService:LoginService) { }

  userType:string = null;

  ngOnInit(): void {
    if(this.loginService.getUserType()=== null){
      alert("Please log in!");
      this.router.navigateByUrl('login');
    }else{
      this.router.navigateByUrl(''+this.loginService.getUserType()+'')
    }
  
  }

}
