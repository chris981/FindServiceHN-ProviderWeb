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
    return this.http.get<Array<ProvidersServiceModel>>(`${this.baseUrl}/api/DayHour/GetDayHours`);
  }

  DeleteProvidersService(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/DayHour/Remove/${id}`);
  }

  UpdateProviderService(category: ProvidersServiceModel): Observable<ProvidersServiceModel> {
    return this.http.put<ProvidersServiceModel>(`${this.baseUrl}/api/DayHour/Update`, category);
  }
}
