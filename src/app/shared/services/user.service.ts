import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/user-model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  GetAllUsers(): Observable<Array<UserModel>> {
    return this.http.get<Array<UserModel>>(`${this.baseUrl}/api/User/GetAll`);
  }

  DeletUser(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/User/Remove/${id}`);
  }
}
