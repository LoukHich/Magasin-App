import { Injectable, OnDestroy, OnInit } from '@angular/core';

import {
  map,
  Observable,
  of,
  Subject,
  take,
  takeUntil,
  throwError,
} from 'rxjs';
import { Product } from '../modele/product.modele';

@Injectable({
  providedIn: 'root',
})
export class ProductService implements OnInit, OnDestroy {
  productse!: Observable<Array<Product>>;

  private destroy$!: Subject<boolean>;

  constructor() {
    console.log('service constructor')
    let arr: Array<Product> = [
      { id: 1, name: 'Acer', price: 2000, promotion: false, selected: false },
      { id: 2, name: 'HP', price: 3000, promotion: true, selected: false },
      { id: 3, name: 'Sony', price: 4000, promotion: true, selected: false },
    ];

    for (let i = 4; i < 27; i++) {
      arr.push({
        id: i,
        name: i % 2 == 0 ? 'Acer' : 'HP',
        price: Math.random() * 10000,
        promotion: i % 2 == 0 ? false : true,
        selected: false,
      });
    }
    this.productse = of([...arr]);
  }

  ngOnInit(): void {
 //   this.destroy$ = new Subject<boolean>();
  }

  // get all products

  public allProducts(): Observable<any> {

    console.log('all Product ...')
    let rnd = Math.random();
    if (rnd > 0) {

      return this.productse;
    } else return throwError(new Error('Error !!!!'));
  }

  // search product by name

  public searchProducts(
    query: string,
    page: number
  ): Observable<Array<Product>> {
    console.log('search ...')
    return this.productse.pipe(

      map((productse) => productse.filter((elm) => elm.name.includes(query)))
    );
  }

  // delete product

  public deleteProductById(id: number): void {
    this.productse = this.productse.pipe(
      map((pro) => {
        console.log('deleted ...');
        return pro.filter((elm) => elm.id != id);
      })
    );
  }

  // add product
  public addProduct(product: Product) {
    this.productse = this.productse.pipe(
    //  take(1),
      map((pro) => {
        product.id = 28;
        pro.push(product);
        console.log('do push');
        return pro;
      }/*, )takeUntil(this.destroy$))*/
    ))
    //return of(true);
  }

  public getProductById(id: number): Observable<Product | undefined> {
    return this.productse.pipe(
      map((prods) => {
        let product: Product | undefined = prods.find((prod) => prod.id === id);

        return product;
      })
    );
  }

  // handle update methode

  public updatProduct(prod: Product) {
    this.productse = this.productse.pipe(
      map((prods) => {
        console.log(prod);

        let index = prods.findIndex((p) => p.id === prod.id);
        console.log('index', index);
        prods[index] = prod;
        console.log(prods);
        return prods;
      })
    );
  }

  public promotedProducts(): Observable<Array<Product>> {
    return this.productse.pipe(
      map((p) => {
        let prods = p.filter((prod) => prod.promotion === true);

        return prods;
      })
    );
  }

  ngOnDestroy(): void {
   // this.destroy$.next(true);
  }
}
