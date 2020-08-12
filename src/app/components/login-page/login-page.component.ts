import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/Modules/user';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  constructor(private loginService:LoginService,private fb:FormBuilder,private route:Router) { }

  token:string = null;

  
  loginUser:User;



  clientTypes: string[] = [
    "admin","company","customer"
  ];


  loginForm: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required,Validators.email]],
      password: ["", Validators.required],
      clientType: ["", Validators.required]
    });
  }


  public login2(){
    if(this.getUser().clientType === "admin"){
    this.loginService.login(this.getUser().email,this.getUser().password,this.getUser().clientType).subscribe((res) =>{
      if(res.status === 200){

     
      this.loginGood(res.body,this.getUser().clientType);
      alert("Loggin successfull welcome Admin! You will be redirected now");
      this.route.navigateByUrl('/');
    }else{
      this.loginBad();
    }
    },(err) =>{
      const error:String = err.error;
      alert(error);
      this.loginBad();
    });
  }else if(this.getUser().clientType === "company"){
    this.loginService.login(this.getUser().email,this.getUser().password,this.getUser().clientType).subscribe((res)=>{
      this.loginGood(res.body,this.getUser().clientType);
      alert("Loggin successfull welcome! You will be redirected now");
      this.route.navigateByUrl('/');
    },(err)=>{
      const error:String = err.error;
      alert(error);
      this.loginBad();
      
    });

  } else if(this.getUser().clientType === "customer"){

    this.loginService.login(this.getUser().email,this.getUser().password,this.getUser().clientType).subscribe((res)=>{
      this.loginGood(res.body,this.getUser().clientType);
      alert("Welcome "+this.getUser().email);
      alert("Loggin successfull welcome! You will be redirected now");
      this.route.navigateByUrl('/');
    },(err)=>{
      const error:String = err.error;
      alert(error);
      this.loginBad();
    });
  }else if(this.getUser().clientType !== "customer"  || this.getUser().clientType !== "admin" || this.getUser().clientType !== "company"){
    this.loginBad();
  }
  }

  logout(){
    this.loginService.badLogin();
    this.ngOnInit();
  }

  public getUser(){
     this.loginUser = new User(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value,this.loginForm.controls['clientType'].value);
     return this.loginUser;
  }

  public loginGood(token:string,userType:string) {
    this.loginService.goodLogin(token,userType);
  
  }

  public loginBad() {
    this.loginService.badLogin();
  }


}
