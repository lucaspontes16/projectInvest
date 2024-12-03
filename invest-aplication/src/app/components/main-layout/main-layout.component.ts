import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared-components/navbar/navbar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [ RouterOutlet],
  templateUrl: './main-layout.component.html', // Apontando para o arquivo HTML externo
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {}