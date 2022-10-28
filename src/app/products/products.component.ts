import { query } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALIDATORS } from '@angular/forms';
import { Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';
import { Product } from '../modele/product.modele';
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  Copyproducts!: Observable<Array<Product>>;
  products!: Observable<Array<Product>>;
  searchform!: FormGroup;
  messageError!: string;
  arr!: Array<number>;
  productsLengh!: number;
  page: number = 0;
  selectedProducts: Product[] = [];
  selectMode: boolean = false;
  selection: string = 'all';

  constructor(
    private productService: ProductService,
    public authService: AuthService,
    private route: Router
  ) { }

  ngOnInit(): void {
    console.log('on init constructor');

    this.products = this.productService.allProducts();

    this.messageError = 'Error !!!!';
    this.arr = this.handlePagination();

    //  form builder
    this.searchform = new FormGroup({
      search: new FormControl(),
    });

    this.Copyproducts = this.products.pipe(map((pro) => pro.slice(0, 5)));
  }

  public deleteProduct(pro: Product) {
    console.log('Delete Done ..');
    this.productService.deleteProductById(pro.id);
    this.products = this.products.pipe(
      map((prods) => {
        return prods.filter((elm) => elm.id != pro.id);
      })
    );
    this.Copyproducts = this.products.pipe(
      map((pro) => pro.slice(this.page * 5, this.page * 5 + 5))
    );
    this.arr = this.handlePagination();
  }

  public searchForm() {
    //console.log(this.searchform.value=null)
    if (this.searchform.value.search == null) {
      this.products = this.productService.searchProducts('', this.page);
      //  this.products.subscribe((v) => console.log(v));
    } else {
      this.products = this.productService.searchProducts(
        this.searchform.value.search,
        this.page
      );
      //  console.log("ghjkl")
    }

    this.handlePagination();
    this.Copyproducts = this.products.pipe(map((pro) => pro.slice(0, 5)));
    this.page = 0;
  }

  public goTo(pg: number) {
    console.log('Go to ....');
    this.page = pg;
    this.Copyproducts = this.products.pipe(
      map((pro) => pro.slice(this.page * 5, this.page * 5 + 5))
    );
  }

  public addPrmo(elm: Product) {
    this.products = this.products.pipe(
      map((p) => {
        let i = p.indexOf(elm);
        if (p[i].promotion == false) {
          p[i].promotion = true;
        }

        return p;
      })
    );

    this.Copyproducts = this.products.pipe(
      map((pro) => pro.slice(this.page * 5, this.page * 5 + 5))
    );
  }

  public handlePagination(): Array<number> {

    this.products.subscribe((val) => {
      console.log('handle pagination ....');
      this.arr = [];
      this.productsLengh = val.length;

      for (let i = 0; i < ~~(this.productsLengh / 5); i++) {
        this.arr.push(i);
      }

      if (this.productsLengh % 5 != 0) {
        this.arr.push(~~(this.productsLengh / 5));
      }
    });

    return this.arr;
  }

  public addNewProduct() {
    this.route.navigateByUrl('/header/newProduct');
  }

  public editProduct(idProduct: number) {
    this.route.navigateByUrl(`/header/editProduct/${idProduct}`);
  }

  public getPromotedProducts() {
    this.products = this.productService.promotedProducts();
    this.handlePagination();
    this.Copyproducts = this.products.pipe(map((pro) => pro.slice(0, 5)));
    this.page = 0;
  }

  public handleGetAllProducts() {
    this.products = this.productService.allProducts();
    this.handlePagination();
    this.Copyproducts = this.products.pipe(map((pro) => pro.slice(0, 5)));
    this.page = 0;
  }

  setSelection(selec: boolean) {
    this.selectMode = selec;
  }

  handleDeleteSelection() { }

  handlePromotion() { }

  select(p: Product) { }
}
