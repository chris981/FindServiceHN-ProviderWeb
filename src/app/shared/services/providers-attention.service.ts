import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { ProviderAttentionModel } from '../models/provider-attention-model';

@Injectable({
  providedIn: 'root'
})
export class ProvidersAttentionService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  GetAllProviderAttention(): Observable<Array<ProviderAttentionModel>> {
    return this.http.get<Array<ProviderAttentionModel>>(`${this.baseUrl}/api/ProvidersAttention/GetProvidersAtt`);
  }

  DeleteProviderAttention(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/ProvidersAttention/Remove/${id}`);
  }

  UpdateProviderAttention(category: ProviderAttentionModel): Observable<ProviderAttentionModel> {
    return this.http.put<ProviderAttentionModel>(`${this.baseUrl}/api/ProvidersAttention/Update`, category);
  }
}