import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyApiService {
  private apiKey = '632d957f20855e050843f248'; // API Key
  private apiUrl = 'https://v6.exchangerate-api.com/v6'; // API URL Base

  constructor(private http: HttpClient) {}

  
   
  
  getExchangeRate(base: string, target: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.apiKey}/pair/${base}/${target}`);
  }

   
    
   
  getCurrencies(): Observable<any> {
  return this.http.get(`${this.apiUrl}/${this.apiKey}/latest/USD`);  
}


  
  getAllRates(base: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.apiKey}/latest/${base}`);
  }
}
