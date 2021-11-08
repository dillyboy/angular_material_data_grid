import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponseModel } from '../api-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  constructor(private http: HttpClient) { }

  getAny(url): Observable<any> {
    return this.http.get<ApiResponseModel>(url);
  }

  getAnyPost(url, body): Observable<any> {
    return this.http.post<ApiResponseModel>(url, body);
  }
}
