import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Coupon } from '../Modules/coupon';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

   loginUrl:string = "http://localhost:8080/login/";
   logoutUrl:string = "http://localhost:8080/login/logout/";
   allCouponsUrl:string = "http://localhost:8080/loginPage/coupons";
   adminUrl:string = "http://localhost:8080/admin/";
   companyUrl:string = "http://localhost:8080/company/";
   customerUrl:string = "http://localhost:8080/customer/";
  



   userToken: string = sessionStorage.getItem('userToken');
   userType:string = sessionStorage.getItem('userType');

  constructor(private http:HttpClient) { }


  getAllCoupons(){
    return this.http.get<Coupon[]>("http://localhost:8080/login/coupons");
  }

  public getUserToken(): string {
    return this.userToken;
  }
  public setUserToken(token: string){
    this.userToken = token;
  }

  public setUserType(type:string){
    this.userType = type;
  }
  
  public getUserType(){
    return this.userType;
  }




  goodLogin(token: string,userType:string) {
    sessionStorage.setItem('userToken', token);
    this.userToken =  sessionStorage.getItem('userToken');
    sessionStorage.setItem('userType',userType)
    this.userType = sessionStorage.getItem('userType');
  }







  badLogin() {
    sessionStorage.removeItem('userType');
    this.userType = null;
    
    this.logout().subscribe(
      (res) => {
        if (res.status === 200) { 
          sessionStorage.removeItem('userToken');
          this.userToken = null;
        }
      },
      (error) => {
      });
    alert('User logged out!');
  }



  public login(email, password, clientType) {

   


    return this.http.post(this.loginUrl+email+"/"+password+"/"+clientType,null, { observe: 'response', responseType:'text'});
  }



  public logout(){
    let url = this.logoutUrl + this.userToken;

    return this.http.get(url, { observe: 'response', responseType: 'text' });
  }
 
}
