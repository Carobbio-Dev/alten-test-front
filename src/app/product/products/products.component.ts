import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductsService } from '../products.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products!: any;
  url: string = '/assets/products.json';

  sortOptions!: SelectItem[];

    sortOrder!: number;

    sortField!: string;

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    // Case import from JSON
    /*this.productService.getAllProductsFromJSON().then(products => {
      this.products = products;
      console.log(this.products)
    });*/
    this.loadData();

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
  ];
  }
  loadData(){
    this.productService.getAllProductsFromAPI().subscribe(
      (products:any) => {
        this.products = products;
      }
  );
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    } else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}

  getSeverity(product: Product) {
      switch (product.inventoryStatus) {
          case 'INSTOCK':
              return 'success';

          case 'LOWSTOCK':
              return 'warning';

          case 'OUTOFSTOCK':
              return 'danger';

          default:
              return null;
      }
  };

}
