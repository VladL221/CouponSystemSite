import { HomePageComponent } from './components/home-page/home-page.component';
import { LoggerComponent } from './components/logger/logger.component';
import { CompanyComponent } from './components/company/company.component';
import { CustomerComponent } from './components/customer/customer.component';
import { AdminComponent } from './components/admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ShopPageComponent } from './components/shop-page/shop-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';



const routes: Routes = [
  {path:"login",component:LoginPageComponent},
  {path:"admin",component:AdminComponent},
  {path:"customer",component:CustomerComponent},
  {path:"company",component:CompanyComponent},
  {path:"shopPage",component:ShopPageComponent},
  {path:"header",component:HeaderComponent},
  {path:"footer",component:FooterComponent},
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path:"**",redirectTo:"/404"},
  {path:"userPanel",component:UserPanelComponent},
  {path:"logger",component:LoggerComponent},
  {path:"home",component:HomePageComponent},
  {path:"404",component:PageNotFoundComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
