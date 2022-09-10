import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoriesModel } from '../models/categories-model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  GetAllCategories(): Observable<Array<CategoriesModel>> {
    return this.http.get<Array<CategoriesModel>>(`${this.baseUrl}/api/Category/GetCategories`);
  }

  DeleteCategory(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/Category/Remove/${id}`);
  }

  UpdateCategory(category: CategoriesModel): Observable<CategoriesModel> {
    return this.http.put<CategoriesModel>(`${this.baseUrl}/api/Category/Update`, category);
  }
}
