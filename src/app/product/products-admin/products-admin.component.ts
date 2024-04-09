import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { ProductsService } from '../products.service';
import { Product } from '../product';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';



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

  constructor(private productService: ProductsService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    // Case import from JSON
    /*this.productService.getAllProductsFromJSON().then(products => {
      this.products = products;
      this.loading = false;
    });*/
    // Case import from API
    this.loadData();
  }

  loadData(){
    this.productService.getAllProductsFromAPI().subscribe(
      (products:any) => {
        this.products = products;
        this.loading = false;
      }
  );
  }

  newClick(){
    console.log("Do something new product"); // TODO
    this.messageService.add({ severity: 'success', summary: 'Info', detail: 'Message Content' });
  }

  deleteClick(table: Table) {
    console.log("Do something clear table"); // TODO
      table.clear();
  }

  parameterClick(){
    console.log("Do something parameter") // TODO
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Message Content' });
  }

  onRowEditInit(product: Product) {
    this.clonedProducts[product.id] = {...product};
  }

  onRowDelete(index: number) {
    this.products.splice(index, 1); // TODO push this remove to API
    this.messageService.add({ severity: 'error', summary: 'success', detail: 'Message Content' });
  }

  onRowEditSave(product: Product) { // TODO
    if (product.price > 0) { // ADD check if all cells are editing
      delete this.clonedProducts[product.id];
      // TODO call API to push
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Message Content' });
  }
  else {
      // TODO toast
      this.messageService.add({ severity: 'warn', summary: 'Warn', detail: 'Message Content' });


  }
  }

  onRowEditCancel(product: Product, index: number) { // TODO
    //this.products[index] = this.clonedProducts[product.id]; // problem data lost
    delete this.clonedProducts[product.id];
    this.messageService.add({ severity: 'info', summary: 'Info', detail: 'Row not change' });

  }

}