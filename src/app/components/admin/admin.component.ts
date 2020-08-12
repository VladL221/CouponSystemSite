import { Customer } from './../../Modules/customer';
import { Company } from './../../Modules/company';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { AdminControllerService } from 'src/app/services/admin-controller.service';
import { Router, Route } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  
  // OUR FORMS
  createCompanyForm: FormGroup;
  createCustomerForm: FormGroup;
  updateCompanyForm: FormGroup;
  updateCustomerForm: FormGroup;
  findOneCus: FormGroup;
  findOneCom: FormGroup;

  // OBJECTS WE USE
  company: Company;
  customer: Customer;
  oneCompany: Company;
  oneCustomer: Customer;

  // USED FOR GENERATING ALL CUSTOMERS + COMPANIES
  companies: Company[];
  customers: Customer[];

  // BOOLEANS TO OPEN AN UPDATE WINDOW
  updateCus: Boolean = false;
  updateCom: Boolean = false;

  constructor(private adminService:AdminControllerService, private fb:FormBuilder, private snack:MatSnackBar,private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
    // COMPANY CREATION
    this.createCompanyForm = this.fb.group({
      name: ['', Validators.required],
      companyEmail: ['', [Validators.required, Validators.email]],
      companyPassword: ['', [Validators.required, Validators.maxLength(12)]]
    });

    // CUSTOMER CREATION
    this.createCustomerForm = this.fb.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerPassword: ['', [Validators.required, Validators.maxLength(12)]]
    });

    // FORM TO FIND A SINGLE COMPANY OR CUSTOMER BASED ON ID - GET ID FROM FORM
    this.findOneCom = this.fb.group({
      companyId: ['', Validators.required]
    });

    this.findOneCus = this.fb.group({
      customerId: ['', Validators.required]
    });

    // FORM TO UPDATE COMPANY
    this.updateCompanyForm = this.fb.group({
      nameUpdate: ['', Validators.required],
      companyUpEmail: ['' , [Validators.required, Validators.email]],
      companyUpPassword: ['' , [Validators.required, Validators.maxLength(12)]]
    });

    // FORM TO UPDATE CUSTOMER
    this.updateCustomerForm = this.fb.group({
      fNameUpdate: ['', Validators.required],
      lNameUpdate: ['', Validators.required],
      customerUpEmail: ['', [Validators.required, Validators.email]],
      customerUpPassword: ['', [Validators.required, Validators.maxLength(12)]]
    });

    // GET ALL COMPANIES TO SHOW THE ADMIN ON LOAD
    this.adminService.getAllCompanies(this.loginService.getUserToken()).subscribe((companies)=>{
      this.companies = companies;
    });

    // GET ALL CUSTOMER TO SHOW THE ADMIN ON LOAD
    this.adminService.getAllCustomers(this.loginService.getUserToken()).subscribe((customers)=>{
      this.customers = customers;
    });

  }

  // COPANY CREATION - RECEIVE DETAILS FROM CREATE COMPANY FORM
  public addNewCompany() {
    const company:Company = new Company(this.createCompanyForm.controls['name'].value, this.createCompanyForm.controls['companyEmail'].value, this.createCompanyForm.controls['companyPassword'].value);
    this.adminService.createCompany(this.loginService.getUserToken(), company).subscribe( (res)=>{
      this.snack.open("Company added sucessfully, ID: " + company.name, "", {duration:2000})
      this.ngOnInit();
    }, (err)=>{
      const error:String = err.error;
      alert(error);
    });
  }

  // CUSTOMER CREATION - RECEIVE DETAILS FROM CREATE CUSTOMER FORM
  public addNewCustomer() {
    const customer:Customer = new Customer( this.createCustomerForm.controls['fName'].value, this.createCustomerForm.controls['lName'].value, this.createCustomerForm.controls['customerEmail'].value, this.createCustomerForm.controls['customerPassword'].value);
    this.adminService.createCustomer(this.loginService.getUserToken(), customer).subscribe( (customer)=>{
      this.snack.open("Customer added sucessfully, ID: " , "", {duration:2000})
      this.ngOnInit();
    }, (err)=>{
      const error:String = err.error;
      alert(error);
    });
  }

  // SEND COMPANY TO UPDATE - SEND WITH COMPANY DEFAULT VALUES THEN CHANGE WHAT WE NEED WHILE SAVING THE REST AS IS
  public updateComOpen(company:Company) {
    this.updateCom = true; // OPEN UPDATE FORM
    this.company = company;
    this.updateCompanyForm.controls['nameUpdate'].setValue(company.name);
    this.updateCompanyForm.controls['companyUpEmail'].setValue(company.email);
    this.updateCompanyForm.controls['companyUpPassword'].setValue(company.password);
  }

   // CANCEL BUTTON TO CLOSE UPDATE FORM WITHOUT UPDATING
   public updateComClose() {
    this.updateCom = false;
  }

  // ACTUAL UPDATE + FORM TO CHANGE WHAT WE NEED TO UPDATE - WHAT WE DONT CHANGE KEEPS DEFAULT VALUES ^^^
  public updateCompany() {
    this.company.name = this.updateCompanyForm.controls['nameUpdate'].value;
    this.company.email = this.updateCompanyForm.controls['companyUpEmail'].value;
    this.company.password = this.updateCompanyForm.controls['companyUpPassword'].value;
    this.adminService.updateCompany(this.loginService.getUserToken(), this.company).subscribe((company)=>{
      this.snack.open("Company updated successfully", "", {duration:2000})
      this.ngOnInit();
      this.updateCom = false;
    }, (err)=>{
      const error:String = err.error;
      alert(error);
    });
  }

  // SEND CUSTOMER TO UPDATE - SEND WITH CUSTOMER DEFAULT VALUES THEN CHANGE WHAT WE NEED WHILE SAVING THE REST AS IS
  public updateCusOpen(customer:Customer) {
    this.updateCus = true; // OPEN UPDATE FORM
    this.customer = customer;
    this.updateCustomerForm.controls['fNameUpdate'].setValue(customer.firstName);
    this.updateCustomerForm.controls['lNameUpdate'].setValue(customer.lastName);
    this.updateCustomerForm.controls['customerUpEmail'].setValue(customer.email);
    this.updateCustomerForm.controls['customerUpPassword'].setValue(customer.password);
  }

  // CANCEL BUTTON TO CLOSE UPDATE FORM WITHOUT UPDATING
  public updateCusClose() {
    this.updateCus = false;
  }

  // ACTUAL UPDATE + FORM TO CHANGE WHAT WE NEED TO UPDATE - WHAT WE DONT CHANGE KEEPS DEFAULT VALUES ^^^
  public updateCustomer() {
    this.customer.firstName = this.updateCustomerForm.controls['fNameUpdate'].value;
    this.customer.lastName = this.updateCustomerForm.controls['lNameUpdate'].value;
    this.customer.email = this.updateCustomerForm.controls['customerUpEmail'].value;
    this.customer.password = this.updateCustomerForm.controls['customerUpPassword'].value;
    this.adminService.updateCustomer(this.loginService.getUserToken(), this.customer).subscribe((customer)=>{
      this.snack.open("Customer updated successfully", "", {duration:2000})
      this.ngOnInit();
      this.updateCus = false;
    }, (err)=>{
      const error:String = err.error;
      alert(error);
    });
  }

  // DELETE COMPANY BASED ON ID
  public deleteCompany(id) {
    this.adminService.deleteCompany(id,this.loginService.getUserToken()).subscribe((response)=>{
      this.snack.open(response, "", {duration:2000})
      this.ngOnInit();
    }, (err)=>{
      const error:String = err.error;
      alert(error);
    });
  }

  // DELETE CUSTOMER BASED ON ID
  public deleteCustomer(id) {
    this.adminService.deleteCustomer(id,this.loginService.getUserToken()).subscribe((response)=>{
      this.snack.open(response, "", {duration:2000})
      this.ngOnInit();
    }, (err)=>{
      const error:String = err.error;
      alert(error);
    });

  }

  // GET ONE COMPANY BASED ON ID - USES FIND ONE FORM
  public getOneCompany() {
    this.adminService.getOneCompany( this.findOneCom.controls['companyId'].value,this.loginService.getUserToken()).subscribe((company)=>{
      this.oneCompany = company;
      this.findOneCom.controls['companyId'].setValue("");
    }, (err)=>{
      const error:String = err.error;
      alert(error);
      this.findOneCom.controls['companyId'].setValue("");
    });
  }

  // GET ONE CUSTOMER BASED ON ID - USES FIND ONE FORM
  public getOneCustomer() {
    this.adminService.getOneCustomer( this.findOneCus.controls['customerId'].value,this.loginService.getUserToken()).subscribe((customer)=>{
      this.oneCustomer = customer;
      this.findOneCus.controls['customerId'].setValue("");
    }, (err)=>{
      const error:String = err.error;
      alert(error);
      this.findOneCus.controls['customerId'].setValue("");
    });
  }

  // IF WE WANT TO REFRESH THE LIST OF ALL COMPANIES WITHOUT RELOADING THE PAGE
  public getAllCompanies() {
    this.adminService.getAllCompanies(this.loginService.getUserToken()).subscribe((companies)=>{
      this.companies = companies;
    });
  }

  // IF WE WANT TO REFRESH THE LIST OF ALL CUSTOMER WITHOUT RELOADING THE PAGE
  public getAllCustomers() {
    this.adminService.getAllCustomers(this.loginService.getUserToken()).subscribe((customers)=>{
      this.customers = customers;
    });
  }

  public cComForm() {
    return this.createCompanyForm.controls;
  }

  public cCusForm() {
    return this.createCustomerForm.controls;
  }

  public uComForm() {
    return this.updateCompanyForm.controls;
  }

  public uCusForm() {
    return this.updateCustomerForm.controls;
  }

  public fCom() {
    return this.findOneCom.controls;
  }

  public fCus() {
    return this.findOneCus.controls;
  }

  goLogs(){
    this.router.navigateByUrl('logger');
  }





}
