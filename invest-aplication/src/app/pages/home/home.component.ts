import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { CommonModule } from '@angular/common';
import { NewsCardComponent } from 'src/app/components/news-card/news-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NewsCardComponent], // Certificando-se de que o NewsCardComponent está importado
  templateUrl: './home.component.html', // Usando o template HTML
  styleUrls: ['./home.component.scss'], // Usando o SCSS
})
export class HomeComponent implements OnInit {
  newsArticles: any[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getInvestmentNews().subscribe({
      next: (data) => {
        console.log('Data received:', data); // Adicionei o console.log para verificar os dados
        this.newsArticles = data.articles;
      },
      error: (err) => console.error('Erro ao carregar notícias', err),
    });
  }
}