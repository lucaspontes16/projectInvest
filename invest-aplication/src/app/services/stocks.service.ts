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
  private cache: Map<string, { data: any; timestamp: number }> = new Map(); // Cache com timestamp
  private cacheDuration = 60000; // Duração do cache em milissegundos (60s)

  constructor(private http: HttpClient) {}

  // Método para pegar dados de ações populares com cache
  getPopularStocks(): Observable<any> {
    const cacheKey = 'popularStocks';
    const cacheEntry = this.cache.get(cacheKey);

    if (cacheEntry && Date.now() - cacheEntry.timestamp < this.cacheDuration) {
      return of(cacheEntry.data); // Retorna dados do cache se disponíveis e válidos
    }

    const url = `${this.baseUrl}/snapshot/locale/us/markets/stocks/tickers`;
    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('limit', '10'); // Reduzindo o número de resultados para o mínimo necessário

    return this.http.get<any>(url, { params }).pipe(
      tap((data) => this.cache.set(cacheKey, { data: data.tickers, timestamp: Date.now() })), // Armazena os dados no cache
      catchError((error) => {
        console.error('Erro ao buscar ações populares:', error);
        return of([]);
      })
    );
  }

  // Método para pegar detalhes de uma ação específica com cache
  getStockData(symbol: string): Observable<any> {
    const cacheKey = `stockData_${symbol}`;
    const cacheEntry = this.cache.get(cacheKey);

    if (cacheEntry && Date.now() - cacheEntry.timestamp < this.cacheDuration) {
      return of(cacheEntry.data); // Retorna dados do cache se disponíveis e válidos
    }

    const url = `${this.baseUrl}/aggs/ticker/${symbol}/prev`;
    const params = new HttpParams().set('apiKey', this.apiKey);

    return this.http.get<any>(url, { params }).pipe(
      tap((data) => this.cache.set(cacheKey, { data: data.results, timestamp: Date.now() })), // Armazena os dados no cache
      catchError((error) => {
        console.error(`Erro ao buscar dados para ${symbol}:`, error);
        return of(null);
      })
    );
  }

  // Método para limpar o cache manualmente
  clearCache(): void {
    this.cache.clear();
  }
}
