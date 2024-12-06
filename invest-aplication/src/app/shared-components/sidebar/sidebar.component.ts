import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importando o CommonModule para usar ngIf e ngFor, por exemplo

@Component({
  selector: 'app-sidebar',
  standalone: true,  // Marca o componente como standalone
  imports: [CommonModule],  // Importa módulos necessários
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  // Lógica do componente, se necessário
}