export interface Product{

  id:number;
  name:string;
  price:number;
  promotion :boolean
  selected:boolean

}
export interface PageProduct {
  products :Product[],
  page:number,
  size: number,
  totalPages:number

}

