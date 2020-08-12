import { LoggerService } from './../../services/logger.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Logger } from 'src/app/Modules/logger';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logger',
  templateUrl: './logger.component.html',
  styleUrls: ['./logger.component.css']
})
export class LoggerComponent implements OnInit {



  constructor(private logger:LoggerService,private loginService:LoginService,private router:Router) { }


  loggs:Logger[];




  ngOnInit(): void {
    this.logger.getAllLoggs(this.loginService.getUserToken()).subscribe((res)=>{
      this.loggs = res;
    },(err)=>{
    })
  }

  compLogs(){
    this.logger.getAllCompaniesLoggs(this.loginService.getUserToken()).subscribe((res)=>{
      this.loggs = res;
     this.router.navigateByUrl('logger');
    },(err)=>{
    })
  }

}
