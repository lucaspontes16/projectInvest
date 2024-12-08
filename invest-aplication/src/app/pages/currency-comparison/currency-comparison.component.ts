import { Component, OnInit } from '@angular/core';
import { CurrencyApiService } from 'src/app/services/currency-api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-currency-comparison',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './currency-comparison.component.html',
  styleUrls: ['./currency-comparison.component.scss'],
})
export class CurrencyComparisonComponent implements OnInit {
  currencies: string[] = [];
  baseCurrency: string = 'USD';
  targetCurrency: string = 'EUR';
  exchangeRate: number | null = null;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(private currencyApiService: CurrencyApiService) {}

  ngOnInit(): void {
  // Obter a lista de moedas disponíveis
  this.currencyApiService.getCurrencies().subscribe({
    next: (data) => {
      console.log('API Response (Currencies):', data); // Verifique a resposta no console do navegador
      if (data && data.conversion_rates) {
        this.currencies = Object.keys(data.conversion_rates); // Pegue as moedas da chave conversion_rates
      } else {
        this.errorMessage = 'Currencies not found.';
      }
    },
    error: (err) => {
      this.errorMessage = 'Failed to load currencies.';
      console.error(err);
    },
  });
}

  // Buscar a taxa de câmbio
  compareCurrencies(): void {
    if (!this.baseCurrency || !this.targetCurrency) return;

    this.isLoading = true;  // Ativar o carregamento
    this.currencyApiService.getExchangeRate(this.baseCurrency, this.targetCurrency).subscribe({
      next: (data) => {
        console.log('API Response (Exchange Rate):', data); // Verifique a resposta da taxa de câmbio
        this.exchangeRate = data.conversion_rate || null; // Ajuste para o formato da resposta
        this.errorMessage = null;
        this.isLoading = false; // Desativar o carregamento
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch exchange rate.';
        this.isLoading = false; // Desativar o carregamento
        console.error(err);
      },
    });
  }
}
