import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NewsCardComponent } from 'src/app/components/news-card/news-card.component';
import { CommonModule } from '@angular/common';
import { RouterLink, Routes } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-page',
  imports: [RouterLink, CommonModule, NewsCardComponent],
  templateUrl: './news-page.component.html',
  styleUrl: './news-page.component.scss',
  encapsulation: ViewEncapsulation.None, // Remove encapsulamento
  
})
export class NewsPageComponent implements OnInit {
  newsArticles: any[] = [];
   @Input() article: any;
   
   
   

constructor(private newsService: NewsService) {}
  ngOnInit(): void {
    this.newsService.getInvestmentNews().subscribe({
      next: (data) => {
        console.log('Data received:', data); // Adicionei o console.log para verificar os dados
        this.newsArticles = data.articles;
      },
      error: (err) => console.error('Erro loading news', err),
    });
}

}
