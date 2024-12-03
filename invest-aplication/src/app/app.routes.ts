import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './services/auth-guard.service';
import { DefaultLoginLayoutComponent } from './components/default-login-layout/default-login-layout.component';
import { AppComponent } from './app.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';

export const routes: Routes = [
  // Rotas públicas (sem header/menu)
  {
    path: '',
    component: AppComponent, // Layout simples para login/signup
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
    ],
  },

  // Rotas protegidas (com header/menu)
  {
    path: '',
    component: MainLayoutComponent, // Layout principal com header/menu
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    ],
  },

  // Rota curinga
  { path: '**', redirectTo: '' },
];