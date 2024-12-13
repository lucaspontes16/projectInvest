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
      console.log('API Response (Currencies):', data); // API response on the browser 
      if (data && data.conversion_rates) {
        this.currencies = Object.keys(data.conversion_rates); 
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

  // Search the currency exchange
  compareCurrencies(): void {
    if (!this.baseCurrency || !this.targetCurrency) return;

    this.isLoading = true; 
    this.currencyApiService.getExchangeRate(this.baseCurrency, this.targetCurrency).subscribe({
      next: (data) => {
        console.log('API Response (Exchange Rate):', data); // Verify the currency exchange
        this.exchangeRate = data.conversion_rate || null; // djusts the answer type
        this.errorMessage = null;
        this.isLoading = false; 
      },
      error: (err) => {
        this.errorMessage = 'Failed to fetch exchange rate.';
        this.isLoading = false; 
        console.error(err);
      },
    });
  }
}
