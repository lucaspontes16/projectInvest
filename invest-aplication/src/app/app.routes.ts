import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { StockPageComponent } from './pages/stock-page/stock-page.component'; 
import { AuthGuard } from './services/auth-guard.service';
import { DefaultLoginLayoutComponent } from './components/default-login-layout/default-login-layout.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { AppComponent } from './app.component';
import { NewsPageComponent } from './pages/news-page/news-page.component';
import { CurrencyComparisonComponent } from './pages/currency-comparison/currency-comparison.component';
import { AboutComponent } from './pages/about/about.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';




export const routes: Routes = [
  // Public routes
  {
    path: '',
    component: AppComponent, 
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
      
    ],
  },

  // Protected Routes
  {
    path: '',
    component: MainLayoutComponent, // Main Layout with header/menu
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'stocks', component: StockPageComponent, canActivate: [AuthGuard] }, 
      { path: 'stocks/:symbol', component: StockPageComponent, canActivate:[AuthGuard] },
      { path: 'news-page', component: NewsPageComponent, canActivate: [AuthGuard] },
      { path: 'about', component: AboutComponent, canActivate: [AuthGuard] },
      { path: 'currency-comparison', 
        component: CurrencyComparisonComponent, 
        canActivate: [AuthGuard],
        data:{role:'admin'} }, //only admin can access to this page 
        { path: 'error-page', component: ErrorPageComponent, canActivate: [AuthGuard] },
    ],
  },

  
  { path: '**', redirectTo: 'login' }, // login page redirection
];
