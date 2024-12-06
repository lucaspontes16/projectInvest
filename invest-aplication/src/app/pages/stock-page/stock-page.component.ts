import { Component, OnInit } from '@angular/core';
import { StocksService } from '../../services/stocks.service';
import { Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-stock-page',
  standalone: true,
  templateUrl: './stock-page.component.html',
  styleUrls: ['./stock-page.component.scss'],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class StockPageComponent implements OnInit {
  popularStocks = [
    { ticker: 'AAPL', name: 'Apple Inc.' },
    { ticker: 'GOOGL', name: 'Alphabet Inc.' },
    { ticker: 'AMZN', name: 'Amazon.com Inc.' },
    { ticker: 'MSFT', name: 'Microsoft Corp.' },
    { ticker: 'TSLA', name: 'Tesla Inc.' },
    { ticker: 'META', name: 'Meta Platforms' },
    { ticker: 'NVDA', name: 'NVIDIA Corporation' },
    { ticker: 'DIS', name: 'The Walt Disney Company' },
    { ticker: 'NFLX', name: 'Netflix, Inc.' },
    { ticker: 'SPY', name: 'SPDR S&P 500 ETF Trust' },
  ];

  searchSubject = new Subject<string>();
  searchResults: any[] = [];
  searchQuery = '';
  errorMessage = '';

  constructor(private stocksService: StocksService, private router: Router) {}

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(500),
      switchMap((query) => this.stocksService.getStockData(query))
    ).subscribe({
      next: (data) => {
        if (data?.results?.length) {
          const stock = data.results[0]; // Pega o primeiro resultado
          this.searchResults = [
            {
              ticker: data.ticker,
              name: '', // Pode ser adicionado um mapeamento de nome fixo
              price: stock.c, // Preço de fechamento
              change: stock.c - stock.o, // Diferença entre fechamento e abertura
              changePercentage: ((stock.c - stock.o) / stock.o) * 100, // Percentual
            },
          ];
        } else {
          this.searchResults = [];
          this.errorMessage = 'Nenhum dado encontrado para esta ação.';
        }
      },
      error: (error) => {
        this.errorMessage = 'Erro ao buscar os dados.';
        console.error(error);
      },
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.searchSubject.next(this.searchQuery.trim());
    }
  }

  loadStockExample(ticker: string): void {
    this.stocksService.getStockData(ticker).subscribe({
      next: (data) => {
        if (data?.results?.length) {
          const stock = data.results[0];
          this.searchResults = [
            {
              ticker: data.ticker,
              name: '', // Nome pode ser fixado ou recuperado de outra fonte
              price: stock.c,
              change: stock.c - stock.o,
              changePercentage: ((stock.c - stock.o) / stock.o) * 100,
            },
          ];
        } else {
          this.errorMessage = 'Nenhum dado encontrado para esta ação.';
        }
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar os dados da ação.';
        console.error(error);
      },
    });
  }

  goToStockDetails(symbol: string): void {
    this.router.navigate(['/stocks', symbol]);
  }
}
