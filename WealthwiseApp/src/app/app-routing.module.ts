import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { RegisterComponent } from './Component/register/register.component';
import { LoginComponent } from './Component/login/login.component';
import { LandingPageComponent } from './Component/landing-page/landing-page.component';
import { ReportComponent } from './Component/report/report.component';

const routes: Routes = [
  {
    path : "" , 
    component : HomeComponent
  },
  {
    path : "register",
    component : RegisterComponent
  },
  { path: 'login', component: LoginComponent },
  { path: 'expenses', component: LandingPageComponent },
  { path : 'report' , component : ReportComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
