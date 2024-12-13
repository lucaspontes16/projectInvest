import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StocksService {
  private apiKey = '195s5XYHcbMzhpBVE8HKjQ8IYbKQuS5P';
  private baseUrl = 'https://api.polygon.io/v2';
  private cache: Map<string, { data: any; timestamp: number }> = new Map(); // Cache with timestamp
  private cacheDuration = 60000; // Cache duration (60s)

  constructor(private http: HttpClient) {}

  getPopularStocks(): Observable<any> {
    const cacheKey = 'popularStocks';
    const cacheEntry = this.cache.get(cacheKey);

    if (cacheEntry && Date.now() - cacheEntry.timestamp < this.cacheDuration) {
      return of(cacheEntry.data); 
    }

    const url = `${this.baseUrl}/snapshot/locale/us/markets/stocks/tickers`;
    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('limit', '10'); 

    return this.http.get<any>(url, { params }).pipe(
      tap((data) => this.cache.set(cacheKey, { data: data.tickers, timestamp: Date.now() })), 
      catchError((error) => {
        console.error('Erro ao buscar ações populares:', error);
        return of([]);
      })
    );
  }

  
  getStockData(symbol: string): Observable<any> {
    const cacheKey = `stockData_${symbol}`;
    const cacheEntry = this.cache.get(cacheKey);

    if (cacheEntry && Date.now() - cacheEntry.timestamp < this.cacheDuration) {
      return of(cacheEntry.data); 
    }

    const url = `${this.baseUrl}/aggs/ticker/${symbol}/prev`;
    const params = new HttpParams().set('apiKey', this.apiKey);

    return this.http.get<any>(url, { params }).pipe(
      tap((data) => this.cache.set(cacheKey, { data: data.results, timestamp: Date.now() })), 
      catchError((error) => {
        console.error(`Erro ao buscar dados para ${symbol}:`, error);
        return of(null);
      })
    );
  }

  
  clearCache(): void {
    this.cache.clear();
  }
}
