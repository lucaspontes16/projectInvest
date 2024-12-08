import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyApiService {
  private apiKey = '632d957f20855e050843f248'; // Substitua pela sua chave de API
  private apiUrl = 'https://v6.exchangerate-api.com/v6'; // URL base da API

  constructor(private http: HttpClient) {}

  /**
   * Obter taxa de câmbio entre duas moedas.
   * @param base Moeda base (exemplo: "USD").
   * @param target Moeda alvo (exemplo: "EUR").
   * @returns Observable com as taxas de câmbio.
   */
  getExchangeRate(base: string, target: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.apiKey}/pair/${base}/${target}`);
  }

  /**
   * Obter todas as moedas disponíveis.
   * @returns Observable com a lista de moedas.
   */
  getCurrencies(): Observable<any> {
  return this.http.get(`${this.apiUrl}/${this.apiKey}/latest/USD`);  // Pegando taxas de câmbio a partir do USD
}


  /**
   * Obter todas as taxas de câmbio baseadas em uma moeda base.
   * @param base Moeda base (exemplo: "USD").
   * @returns Observable com as taxas de câmbio.
   */
  getAllRates(base: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${this.apiKey}/latest/${base}`);
  }
}
