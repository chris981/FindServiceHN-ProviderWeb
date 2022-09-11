import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { DayhoursModel } from '../models/dayhours-model';

@Injectable({
  providedIn: 'root'
})
export class DayhoursService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  GetAlldayHours(): Observable<Array<DayhoursModel>> {
    return this.http.get<Array<DayhoursModel>>(`${this.baseUrl}/api/DayHour/GetDayHours`);
  }

  DeleteDayHours(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/DayHour/Remove/${id}`);
  }

  UpdateDayHours(category: DayhoursModel): Observable<DayhoursModel> {
    return this.http.put<DayhoursModel>(`${this.baseUrl}/api/DayHour/Update`, category);
  }
}
