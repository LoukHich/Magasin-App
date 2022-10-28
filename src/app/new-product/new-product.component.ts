import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../modele/product.modele';

import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnDestroy  {

  sub!:Subscription//Observable<Array<Product>>
  newProductFom !:FormGroup
  constructor(private formBuilder:FormBuilder,
              private  productService:ProductService,
              private route :Router
    ) {
    this.newProductFom = this.formBuilder.group(
      {
         name:this.formBuilder.control(null,[Validators.required,Validators.minLength(4)]),
         price:this.formBuilder.control(null,[Validators.required, Validators.pattern("^[0-9]*$"),Validators.min(200)]),
         promotion:this.formBuilder.control(false,[Validators.required])
      },
      {
        updateOn: 'blur'
      }
    )
   }


  ngOnInit(): void {
  }


  public handleAddProduct(){


   this.productService.addProduct(this.newProductFom.value)/*.subscribe(
      (v)=>{
        alert('product aded succefly')
        this.newProductFom.reset()
        this.route.navigateByUrl("header/products")
        console.log(v)
      }
    )*/

  }

  public getErrorMessage(fieldName:string,error:ValidationErrors){

        if(error['required'])
        return fieldName +" is required"
        else if(error['minlength'])
        return fieldName + " should have at least "+error['minlength']['requiredLength'] + " Characters"
        else if (error['min'])
        return fieldName +" should have min value 200 "+error['min']['min']
        else if(error['pattern'])
        return fieldName +" should be only numeric value "
        return ""
  }

  ngOnDestroy(): void {

 //  this.sub.unsubscribe()
  }
}
