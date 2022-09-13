import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { QuotesDetail } from '../models/quotes-detail-model';

@Injectable({
  providedIn: 'root'
})
export class QuotesDetailService {

 
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  GetAllQuotesDetail(): Observable<Array<QuotesDetail>> {
    return this.http.get<Array<QuotesDetail>>(`${this.baseUrl}/api/QuotesDetail/GetQuotesDetail`);
  }

  DeleteQuotesDetail(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseUrl}/api/QuotesDetail/Remove/${id}`);
  }

  UpdateQuotesDetail(category: QuotesDetail): Observable<QuotesDetail> {
    return this.http.put<QuotesDetail>(`${this.baseUrl}/api/QuotesDetail/Update`, category);
  }
}
