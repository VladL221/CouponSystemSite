import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  arrow:string = 'keyboard_arrow_down';
  expand = '120px';
  expandHeigth = '73px';
  status:boolean = false;
  transform = '';
  ngOnInit(): void {
  }


clicked(){
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

}


}
