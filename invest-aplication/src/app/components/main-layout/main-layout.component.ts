import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared-components/navbar/navbar.component';
import { FooterComponent } from "../../shared-components/footer/footer.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,  // Indica que é um componente independente
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './main-layout.component.html', 
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent {}