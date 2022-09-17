import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CountriesModel } from '../models/countries-model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  GetAllCustomers(): Observable<Array<CountriesModel>> {
    return this.http.get<Array<CountriesModel>>(`${this.baseUrl}/api/Countries/GetCountries`);
  }

  DeleteCustomer(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/Countries/Remove/${id}`);
  }

  UpdateCustomer(countries: CountriesModel): Observable<CountriesModel> {
    return this.http.put<CountriesModel>(`${this.baseUrl}/api/Countries/Update`, countries);
  }
}
