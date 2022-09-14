import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrdersHeaderModel } from '../models/orders-header-model';

@Injectable({
  providedIn: 'root'
})
export class OrderHeaderService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  GetAllOrderHeader(): Observable<Array<OrdersHeaderModel>> {
    return this.http.get<Array<OrdersHeaderModel>>(`${this.baseUrl}/api/OrderHeader/GetOrderHeader`);
  }

  DeleteOrderHeader(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/OrderHeader/Remove/${id}`);
  }

  UpdateOrderHeader(Status: OrdersHeaderModel): Observable<OrdersHeaderModel> {
    return this.http.put<OrdersHeaderModel>(`${this.baseUrl}/api/OrderHeader/Update`, Status);
  }
}
