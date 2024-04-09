import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './shared/guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

import { ForgetpasswordComponent } from './setting/forgetpassword/forgetpassword.component';

const routes: Routes = [
    {path:'', canActivate: [ authGuard ]  , component:BlankLayoutComponent, children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home', component:HomeComponent,title:'Home'},
    {path:'cart', component:CartComponent,title:'Cart'},
    {path:'forgetpassword', component:ForgetpasswordComponent,title:'Forget Password'},

    // the module path i want to import
    {path:'setting',title:'Setting'  , loadChildren:()=>import('./setting/setting.module').then( (m)=>m.SettingModule )},

    {path:'products', component:ProductsComponent,title:'Products'},
    {path:'allorders', component:HomeComponent},
    {path:'details/:id', component:DetailsComponent},
    {path:'check out/:id', component:CheckoutComponent,title:'Check Out'},


    
  ]},



  {path:'', component:AuthLayoutComponent, children:[
    {path:'login',component:LoginComponent,title:'Login'},
    {path:'register', component:RegisterComponent,title:'Register'},
    {path:'forget', component:ForgetpasswordComponent,title:'Forget Password'},

  ]},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
