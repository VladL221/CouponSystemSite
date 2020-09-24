import { Customer } from './../Modules/customer';
import { Company } from './../Modules/company';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminControllerService {

  comp:Company;
  adminUrl:string = "http://localhost:8080/admin/";
  creatComp:string = "http://localhost:8080/admin/create/";
  getComp:string = "http://localhost:8080/admin/find/one/company/"
  isAuthenticate:boolean = false;

  constructor(private http:HttpClient,private loginService:LoginService) { }



  public authenticateCheck(email:string,password:string,clientType:string){
    if(email === "admin@admin" && password === "admin" && clientType === "admin"){
      this.isAuthenticate = true;
    }else{
      this.isAuthenticate = false;
    }

  }




createCompany(token:string,company:Company){
  return this.http.post<Company>("http://localhost:8080/admin/create/company/" +token,company,{ observe: 'response'});
}

updateCompany(token:string, company:Company):Observable<any>{
  return this.http.put("http://localhost:8080/admin/update/company/" + token, company,{ observe: 'response',responseType: 'text'});
}

deleteCompany(id:number,token:string){
  return this.http.delete("http://localhost:8080/admin/delete/company/" + id + "/" + token, {responseType: 'text'});
}

getAllCompanies(token:string){
  return this.http.get<Company[]>("http://localhost:8080/admin/find/all/companies/" + token);
}

getOneCompany( id:number,token:string){
  return this.http.get<Company>("http://localhost:8080/admin/find/one/company/" + id + "/" + token);
}

createCustomer(token:string, customer:Customer){
  return this.http.post<Customer>("http://localhost:8080/admin/create/customer/" + token, customer,{ observe: 'response'});
}

updateCustomer(token:string, customer:Customer):Observable<any>{
  return this.http.put("http://localhost:8080/admin/update/customer/" + token, customer,{ observe: 'response',responseType: 'text'});
}

deleteCustomer(id:number,token:string){
  return this.http.delete("http://localhost:8080/admin/delete/customer/" + id + "/" + token, {responseType: 'text'});
}

getAllCustomers(token:string){
  return this.http.get<Customer[]>("http://localhost:8080/admin/find/all/customers/" + token);
}

getOneCustomer(id:number,token:string){
  return this.http.get<Customer>("http://localhost:8080/admin/find/one/customer/" + id + "/" + token);
}

}
