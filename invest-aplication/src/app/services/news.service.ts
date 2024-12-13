import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiUrl = 'https://newsapi.org/v2/everything?q=investment&apiKey=fb74b5d5faf7429b8c39eb6fe9f22f1f';

  constructor(private http: HttpClient) {}

  getInvestmentNews(): Observable<any> {
    return this.http.get<any>(this.apiUrl); 
  }
}