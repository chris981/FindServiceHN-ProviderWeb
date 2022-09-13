import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OrdersSatisfactionModel } from '../models/orders-satisfaction-model';

@Injectable({
  providedIn: 'root'
})
export class OrderSatisfactionService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  GetAllOrderSatisfaction(): Observable<Array<OrdersSatisfactionModel>> {
    return this.http.get<Array<OrdersSatisfactionModel>>(`${this.baseUrl}/api/OrderSatisfaction/GetOrderSatisfaction`);
  }

  DeleteOrderSatisfaction(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/OrderSatisfaction/Remove/${id}`);
  }

  UpdateOrderSatisfaction(Status: OrdersSatisfactionModel): Observable<OrdersSatisfactionModel> {
    return this.http.put<OrdersSatisfactionModel>(`${this.baseUrl}/api/OrderSatisfaction/Update`, Status);
  }
}