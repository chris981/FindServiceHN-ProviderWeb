import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.baseUrl;
  constructor(
    private http: HttpClient
  ) { }

  getProducts(): Observable<Array<Product>>{
    return this.http.get<Product[]>(`${this.baseUrl}/api/product/GetProduct`);
  }
}
