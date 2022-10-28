import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../modele/product.modele';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  updatProductFom!:FormGroup
  product!:Product



  constructor(private productService:ProductService,
               private formBuilder:FormBuilder  ,
               private route:ActivatedRoute,
               private router:Router  ) { }

  ngOnInit(): void {

    this.productService.getProductById(+this.route.snapshot.params['id']).subscribe(
      (prod)=>{
        if(prod)
         this.product=prod
      }
    )
         console.log(this.route.snapshot.params['id'])

   this.updatProductFom=this.formBuilder.group(
         {
          name:this.formBuilder.control(this.product?.name,[Validators.required,Validators.minLength(4)]),
          price:this.formBuilder.control(this.product?.price,[Validators.required, Validators.pattern("^[0-9]*$"),Validators.min(200)]),
          promotion:this.formBuilder.control(this.product?.promotion,[Validators.required])

         },
         {
          updateOn: 'blur'
        }



   )


  }

   public editProduct(){

       alert('product aded succefly')
       this.productService.updatProduct({...this.updatProductFom.value,id:this.product.id})
       this.router.navigateByUrl('header/products')
   }

  public getErrorMessage(fieldName:string,error:ValidationErrors){

    if(error['required'])
    return fieldName +" is required"
    else if(error['minlength'])
    return fieldName + " should have at least "+error['minlength']['requiredLength'] + " Characters"
    else if (error['min'])
    return fieldName +" should have min value 200 "//+error['min']['min']
    else if(error['pattern'])
    return fieldName +" should be only numeric value "
    return ""
}


}
