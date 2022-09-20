import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MunicipalitiesModel } from '../models/municipalities-model';

@Injectable({
  providedIn: 'root'
})
export class MunicipalitiesService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  GetAllMunicipalities(): Observable<Array<MunicipalitiesModel>> {
    return this.http.get<Array<MunicipalitiesModel>>(`${this.baseUrl}/api/Municipalities/GetMunicipalities`);
  }

  DeleteMunicipality(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/Municipalities/Remove/${id}`);
  }

  UpdateMunicipality(countries: MunicipalitiesModel): Observable<MunicipalitiesModel> {
    return this.http.put<MunicipalitiesModel>(`${this.baseUrl}/api/Municipalities/Update`, countries);
  }

  CreateMunicipalityt(countries: MunicipalitiesModel): Observable<MunicipalitiesModel> {
    return this.http.post<MunicipalitiesModel>(`${this.baseUrl}/api/Municipalities/Create`, countries);
  }
}
