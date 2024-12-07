import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-card.component.html',  // HTML import 
  styleUrls: ['./news-card.component.scss'], // SCSS import 
})
export class NewsCardComponent {
  @Input() article: any;
}