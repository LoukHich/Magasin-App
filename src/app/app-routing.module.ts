import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustumersComponent } from './custumers/custumers.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"login",component:LoginComponent},

  {path:"header",
    canActivate:[AuthenticationGuard],
  children:[
    {path:"products", component:ProductsComponent},
    {path:"custumers", component:CustumersComponent,canActivate:[AuthenticationGuard]},
    {path:"newProduct", component:NewProductComponent,canActivate:[AuthenticationGuard]},
    {path:"editProduct/:id",component:EditProductComponent,canActivate:[AuthenticationGuard]}


]}]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
