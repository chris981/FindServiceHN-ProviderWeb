import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ProvidersModel } from '../models/providers-model';
@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  GetAllProviders(): Observable<Array<ProvidersModel>> {
    return this.http.get<Array<ProvidersModel>>(`${this.baseUrl}/api/Providers/GetProviders`);
  }

  CreateProviders(providers: ProvidersModel): Observable<ProvidersModel> {
    return this.http.post<ProvidersModel>(`${this.baseUrl}/api/Providers/Create`, providers);
  }
  DeleteProviders(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/Providers/Remove/${id}`);
  }

  UpdateProviders(providers: ProvidersModel): Observable<ProvidersModel> {
    return this.http.put<ProvidersModel>(`${this.baseUrl}/api/Providers/Update`, providers);
  }
}
