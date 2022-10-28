import { Component, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Product } from './modele/product.modele';
import { ProductsComponent } from './products/products.component';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent /*implements OnInit*/{
  title ="Nadori App"
  /*

  products: Observable<Array<Product>>= new Observable();

constructor(private productService :ProductService,private product :ProductsComponent){}

  ngOnInit(): void {

this.products=this.productService.allProducts()

// teste Delete
this.products = this.products.pipe(map(prods=>{
return prods.filter(elm=>elm.id!=5)

}))

// teste Add promotion (Boolean true )
this.products= this.products.pipe(
  map(p=>{

   let i= 0
  if(p[i].promotion==false){
   p[i].promotion=true
  }
  else p[i].promotion=false

  return p
 }
 ))


this.products.subscribe(v=>console.log("Component products :",v))
this.productService.allProducts().subscribe((v)=>console.log("Service products :",v))
*/
//this.productService.allProducts().subscribe(v=>console.log(v))
//this.products.subscribe((v)=>console.log(v))
   /* this.products=this.productService.allProducts()
    this.products= this.products.pipe(
      map(p=>{

       let i=  p.indexOf({id:1,name:"Acer",price:2000,promotion:false})
       p[i].promotion=true
       return p
     })

        )
        console.log(this.products)
   // this.productService.addpromtion(1)

 /*   console.log("*********** Nadori Here ******************")
       this.productService.allProducts().subscribe((val)=>{
       this.products=val
    })
    console.log(this.products)



     this.productService.searchProducts("",5).subscribe(
         val=>{this.products=val}
      )
    console.log(this.products)

   /* this.productService.deleteProductById(1)

    this.productService.allProducts().subscribe((val)=>{
      this.products=val
   })
   console.log(this.products)

   this.productService.allProducts().pipe(  map(productse=> productse.filter((elm)=>elm.id!=5))).subscribe({
     next:(v)=>{
      console.log(v)
     }
   })


   this.productService.allProducts().subscribe((val)=>{
    this.products=val
 })
 console.log(this.products)
*/
  }

