import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrdersDetailModel } from '../models/orders-detail-model';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  GetAllOrderDetail(): Observable<Array<OrdersDetailModel>> {
    return this.http.get<Array<OrdersDetailModel>>(`${this.baseUrl}/api/OrderDetail/GetOrderDetail`);
  }

  CreateOrderDetail(category: OrdersDetailModel): Observable<OrdersDetailModel> {
    return this.http.post<OrdersDetailModel>(`${this.baseUrl}/api/OrderDetail/Create`, category);
  }

  DeleteOrderDetail(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/OrderDetail/Remove/${id}`);
  }

  UpdateOrderDetail(Status: OrdersDetailModel): Observable<OrdersDetailModel> {
    return this.http.put<OrdersDetailModel>(`${this.baseUrl}/api/OrderDetail/Update`, Status);
  }
}
