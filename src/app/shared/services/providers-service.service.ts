import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ProvidersServiceModel } from '../models/providers-service-model';

@Injectable({
  providedIn: 'root'
})
export class ProvidersServiceService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  GetAllProviderService(): Observable<Array<ProvidersServiceModel>> {
    return this.http.get<Array<ProvidersServiceModel>>(`${this.baseUrl}/api/ProviderService/GetProviderService`);
  }
  CreateProvidersService(providersService: ProvidersServiceModel): Observable<ProvidersServiceModel> {
    return this.http.post<ProvidersServiceModel>(`${this.baseUrl}/api/ProvidersService/Create`, providersService);
  }
  DeleteProvidersService(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/ProvidersService/Remove/${id}`);
  }

  UpdateProviderService(providerService: ProvidersServiceModel): Observable<ProvidersServiceModel> {
    return this.http.put<ProvidersServiceModel>(`${this.baseUrl}/api/ProvidersService/Update`, providerService);
  }
}
