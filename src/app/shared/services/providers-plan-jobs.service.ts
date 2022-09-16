import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ProviderPlansJobsModel } from '../models/provider-plans-jobs-model';

@Injectable({
  providedIn: 'root'
})
export class ProvidersPlanJobsService {

  baseUrl = environment.baseUrl;
constructor(private http: HttpClient) { }

  GetAllProviderPlanJobs(): Observable<Array<ProviderPlansJobsModel>> {
    return this.http.get<Array<ProviderPlansJobsModel>>(`${this.baseUrl}/api/DayHour/GetDayHours`);
  }

  DeleteProviderPlanJobs(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/DayHour/Remove/${id}`);
  }

  UpdateProviderPlanJobs(category: ProviderPlansJobsModel): Observable<ProviderPlansJobsModel> {
    return this.http.put<ProviderPlansJobsModel>(`${this.baseUrl}/api/DayHour/Update`, category);
  }
}
