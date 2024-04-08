import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss']
})
export class ProductsAdminComponent implements OnInit {
  @ViewChild('dt') table: Table;
  products: any;
  clonedProducts: { [s: string]: Product; } = {};

  selectedProducts: Product[];
  url: string = '/assets/products.json';

  statuses: any[];

  loading: boolean = true;

  constructor(private productService: ProductsService, private http: HttpClient) { }

  ngOnInit() {
    this.productService.getAllProductsFromJSON().then(products => {
      this.products = products;
      this.loading = false;
  });
    
  }
  newClick(){
    console.log("Do something new product"); // TODO
  }

  deleteClick(table: Table) {
    console.log("Do something clear table"); // TODO
      table.clear();
  }

  parameterClick(){
    console.log("Do something parameter") // TODO
  }

  onRowEditInit(product: Product) {
    this.clonedProducts[product.id] = {...product};
  }

  onRowDelete(index: number) {
  }

  onRowEditSave(product: Product) {
  }

  onRowEditCancel(product: Product, index: number) {
  }

}