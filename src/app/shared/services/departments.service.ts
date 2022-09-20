import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DepartmentesModel } from '../models/departmentes-model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  GetAllDepartment(): Observable<Array<DepartmentesModel>> {
    return this.http.get<Array<DepartmentesModel>>(`${this.baseUrl}/api/Departments/GetDepartments`);
  }

  DeleteDepartment(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/Departments/Remove/${id}`);
  }

  UpdateDepartment(departments: DepartmentesModel): Observable<DepartmentesModel> {
    return this.http.put<DepartmentesModel>(`${this.baseUrl}/api/Departments/Update`, departments);
  }

  CreateDepartment(departments: DepartmentesModel): Observable<DepartmentesModel> {
    return this.http.post<DepartmentesModel>(`${this.baseUrl}/api/Departments/Create`, departments);
  }
}
