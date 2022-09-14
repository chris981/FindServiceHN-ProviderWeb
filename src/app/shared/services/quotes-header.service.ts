import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { QuotesHeaderModel } from '../models/quotes-header-model';

@Injectable({
  providedIn: 'root'
})
export class QuotesHeaderService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  GetAllQuotesHeader(): Observable<Array<QuotesHeaderModel>> {
    return this.http.get<Array<QuotesHeaderModel>>(`${this.baseUrl}/api/QuotesHeader/GetQuotes`);
  }

  DeleteQuotesHeader(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/QuotesHeader/Remove/${id}`);
  }

  UpdateQuotesHeader(category: QuotesHeaderModel): Observable<QuotesHeaderModel> {
    return this.http.put<QuotesHeaderModel>(`${this.baseUrl}/api/QuotesHeader/Update`, category);
  }
}


