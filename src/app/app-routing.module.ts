import { HomePageComponent } from './components/home-page/home-page.component';
import { LoggerComponent } from './components/logger/logger.component';
import { CompanyComponent } from './components/company/company.component';
import { CustomerComponent } from './components/customer/customer.component';
import { AdminComponent } from './components/admin/admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { ShopPageComponent } from './components/shop-page/shop-page.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { FAQComponent } from './components/faq/faq.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AdminGuardGuard } from './RouteGuards/admin-guard.guard';
import { CustomerGuardGuard } from './RouteGuards/customer-guard.guard';
import { CompanyGuardGuard } from './RouteGuards/company-guard.guard';
import { SettingsComponent } from './components/settings/settings.component';




const routes: Routes = [
  {path:"login",component:LoginPageComponent},
  {path:"admin",component:AdminComponent,canActivate:[AdminGuardGuard]},
  {path:"customer",component:CustomerComponent,canActivate:[CustomerGuardGuard]},
  {path:"company",component:CompanyComponent,canActivate:[CompanyGuardGuard]},
  {path:"shopPage",component:ShopPageComponent},
  {path:"header",component:HeaderComponent},
  {path:"footer",component:FooterComponent},
  {path: "", redirectTo: "home", pathMatch: "full"},
  {path:"userPanel",component:UserPanelComponent},
  {path:"logger",component:LoggerComponent},
  {path:"home",component:HomePageComponent},
  {path:"aboutus",component:AboutUsComponent},
  {path:"contactUs",component:ContactUsComponent},
  {path:"signUp",component:SignUpComponent},
  {path:"settings",component:SettingsComponent},
  {path:"FAQ",component:FAQComponent},
  {path:"**",component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
