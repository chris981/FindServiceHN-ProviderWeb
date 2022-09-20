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

  GetAllCountry(): Observable<Array<CountriesModel>> {
    return this.http.get<Array<CountriesModel>>(`${this.baseUrl}/api/Countries/GetCountries`);
  }

  DeleteCountry(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/Countries/Remove/${id}`);
  }

  UpdateCountry(countries: CountriesModel): Observable<CountriesModel> {
    return this.http.put<CountriesModel>(`${this.baseUrl}/api/Countries/Update`, countries);
  }

  CreateCountry(countries: CountriesModel): Observable<CountriesModel> {
    return this.http.post<CountriesModel>(`${this.baseUrl}/api/Countries/Create`, countries);
  }
}
