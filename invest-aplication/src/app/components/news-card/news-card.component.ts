import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-card.component.html',  // Importando o HTML
  styleUrls: ['./news-card.component.scss'], // Importando o SCSS
})
export class NewsCardComponent {
  @Input() article: any;
}