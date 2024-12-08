import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { CommonModule } from '@angular/common';
import { NewsCardComponent } from 'src/app/components/news-card/news-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NewsCardComponent, RouterLink], // Certify that the modules are imported 
  templateUrl: './home.component.html', // Using HTML template 
  styleUrls: ['./home.component.scss'], // Using SCSS template 
})
export class HomeComponent implements OnInit {
  newsArticles: any[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.newsService.getInvestmentNews().subscribe({
      next: (data) => {
        console.log('Data received:', data); // console.log added to data verify 
        this.newsArticles = data.articles;
      },
      error: (err) => console.error('Error loading news', err),
    });
  }
}