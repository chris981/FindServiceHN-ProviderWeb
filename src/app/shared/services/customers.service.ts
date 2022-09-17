import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomersModel } from '../models/customers-model';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  GetAllCustomers(): Observable<Array<CustomersModel>> {
    return this.http.get<Array<CustomersModel>>(`${this.baseUrl}/api/Customers/GetCustomers`);
  }

  DeleteCustomer(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/Customers/Remove/${id}`);
  }

  UpdateCustomer(customer: CustomersModel): Observable<CustomersModel> {
    return this.http.put<CustomersModel>(`${this.baseUrl}/api/Customers/Update`, customer);
  }
}
