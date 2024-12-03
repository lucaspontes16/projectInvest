import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes'; // Rotas da aplicação

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), // Otimiza detecção de mudanças
    provideRouter(routes), // Provedor de rotas
    provideHttpClient(withFetch()), // Suporte a chamadas HTTP com Fetch API
    provideToastr(), // Configuração para notificações
    provideAnimations(), // Ativa animações para toda a aplicação
    provideAnimationsAsync(), // Suporte assíncrono adicional para animações
  ],
};