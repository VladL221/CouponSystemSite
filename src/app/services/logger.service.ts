import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './login.service';
import { Logger } from '../Modules/logger';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(private http:HttpClient,private loginService:LoginService) { }




public getAllLoggs(token:string){
  return this.http.get<Logger[]>("http://localhost:8080/admin/getAllLoggers/"+token);
}


public getAllCompaniesLoggs(token:string){
return this.http.get<Logger[]>("http://localhost:8080/admin/getAllCompaniesLoggs/"+token);
}

public getAllCustomersLoggs(token:string){
  return this.http.get<Logger[]>("http://localhost:8080/admin/getAllCustomersLoggs/"+token);
}

public getAllSpecificClientLoggs(id:number,type:string,token:string){

}

  
}
