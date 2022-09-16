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
    return this.http.get<Array<ProvidersModel>>(`${this.baseUrl}/api/DayHour/GetDayHours`);
  }

  DeleteProviders(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/DayHour/Remove/${id}`);
  }

  UpdateProviders(category: ProvidersModel): Observable<ProvidersModel> {
    return this.http.put<ProvidersModel>(`${this.baseUrl}/api/DayHour/Update`, category);
  }
}
