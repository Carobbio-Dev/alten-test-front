import { Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {}

  getAllProducts(){
    return this.http.get<any>('assets/products.json')
    .toPromise()
    .then(res => <Product[]>res.data)
    .then(data => { return data; });
 
  }
}
