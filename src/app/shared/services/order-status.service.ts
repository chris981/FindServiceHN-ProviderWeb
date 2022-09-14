import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrderStatus } from '../models/order-status-model';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  GetAllOrderStatus(): Observable<Array<OrderStatus>> {
    return this.http.get<Array<OrderStatus>>(`${this.baseUrl}/api/OrderStatus/GetOrderStatus`);
  }

  DeleteOrderStatus(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/OrderStatus/Remove/${id}`);
  }

  UpdateOrderStatus(Status: OrderStatus): Observable<OrderStatus> {
    return this.http.put<OrderStatus>(`${this.baseUrl}/api/OrderStatus/Update`, Status);
  }
}
