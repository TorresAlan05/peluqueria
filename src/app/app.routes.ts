import { Routes } from '@angular/router';
import { Registro } from './registro/registro';
import { Login } from './login/login';

export const routes: Routes = [
  { path: 'login', component: Login }, // <--- Asegúrate de que esta línea exista
  { path: 'registro', component: Registro },
  // ... otras rutas
];
