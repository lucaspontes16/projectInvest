import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';



@Component({
  selector: 'app-navbar',
   standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
     constructor(private loginService: LoginService) {}

  logout(): void {
    this.loginService.logout();
  }

}
