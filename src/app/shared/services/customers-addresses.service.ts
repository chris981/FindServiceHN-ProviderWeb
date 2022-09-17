import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomersAddressModel } from '../models/customers-address-model';

@Injectable({
  providedIn: 'root'
})
export class CustomersAddressesService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  GetAllCustomersAddress(): Observable<Array<CustomersAddressModel>> {
    return this.http.get<Array<CustomersAddressModel>>(`${this.baseUrl}/api/CustomerAddress/GetCustomerAddress`);
  }

  DeleteCustomerAddress(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/CustomerAddress/Remove/${id}`);
  }

  UpdateCustomerAddress(customerAddress: CustomersAddressModel): Observable<CustomersAddressModel> {
    return this.http.put<CustomersAddressModel>(`${this.baseUrl}/api/CustomerAddress/Update`, customerAddress);
  }
}
