import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ProductModel } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  GetAllProduct(): Observable<Array<ProductModel>> {
    return this.http.get<Array<ProductModel>>(`${this.baseUrl}/api/Product/GetProduct`);
  }

  DeleteProduct(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/Product/Remove/${id}`);
  }

  UpdateProduct(category: ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(`${this.baseUrl}/api/Product/Update`, category);
  }
}
