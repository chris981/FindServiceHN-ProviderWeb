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
  constructor(
    private http: HttpClient
    ) { }

  getOrderStatus(): Observable<Array<OrderStatus>> {
    return this.http.get<OrderStatus[]>(`${this.baseUrl}/api/OrderStatus/GetOrderStatus`);
  }
}
