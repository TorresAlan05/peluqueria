import { Routes } from '@angular/router';
import { Registro } from './registro/registro';
import { Login } from './login/login';
import { Home } from './home/home';
import { Turno } from './turno/turno';
import { MisTurnos } from './mis-turnos/mis-turnos';

export const routes: Routes = [
  { path: 'login', component: Login }, // <--- Asegúrate de que esta línea exista
  { path: 'registro', component: Registro },
  { path: 'home', component: Home },
  { path: 'turno', component: Turno },
  { path: 'mis-turnos', component: MisTurnos },
  // ... otras rutas
];
