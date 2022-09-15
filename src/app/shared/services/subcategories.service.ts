import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { SubcategoriesModel } from '../models/subcategories-model';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriesService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  GetAllSubCategories(): Observable<Array<SubcategoriesModel>> {
    return this.http.get<Array<SubcategoriesModel>>(`${this.baseUrl}/api/SubCategory/GetSubCategories`);
  }

  DeleteSubCategories(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/SubCategory/Remove/${id}`);
  }

  UpdateSubCategories(category: SubcategoriesModel): Observable<SubcategoriesModel> {
    return this.http.put<SubcategoriesModel>(`${this.baseUrl}/api/SubCategory/Update`, category);
  }
}
