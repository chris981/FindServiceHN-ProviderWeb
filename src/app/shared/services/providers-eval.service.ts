import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ProviderEvalModel } from '../models/provider-eval-model';

@Injectable({
  providedIn: 'root'
})
export class ProvidersEvalService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  
  GetAllProviderEval(): Observable<Array<ProviderEvalModel>> {
    return this.http.get<Array<ProviderEvalModel>>(`${this.baseUrl}/api/DayHour/GetDayHours`);
  }

  DeleteProviderEval(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/DayHour/Remove/${id}`);
  }

  UpdateProviderEval(category: ProviderEvalModel): Observable<ProviderEvalModel> {
    return this.http.put<ProviderEvalModel>(`${this.baseUrl}/api/DayHour/Update`, category);
  }
}
