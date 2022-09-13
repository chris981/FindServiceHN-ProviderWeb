import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ServiceStatusModel } from '../models/service-status-model';

@Injectable({
  providedIn: 'root'
})
export class ServiceStatusService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  GetAllServicesStatus(): Observable<Array<ServiceStatusModel>> {
    return this.http.get<Array<ServiceStatusModel>>(`${this.baseUrl}/api/ServicesStatus/GetServicesStatus`);
  }

  DeleteServicesStatus(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/ServicesStatus/Remove/${id}`);
  }

  UpdateServicesStatus(category: ServiceStatusModel): Observable<ServiceStatusModel> {
    return this.http.put<ServiceStatusModel>(`${this.baseUrl}/api/ServicesStatus/Update`, category);
  }
}
