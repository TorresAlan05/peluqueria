import { Routes, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Registro } from './registro/registro';
import { Login } from './login/login';
import { Home } from './home/home';
import { Admin } from './admin/admin'; 
import { Turno } from './turno/turno';
import { MisTurnos } from './mis-turnos/mis-turnos';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'admin-dashboard', component: Admin }, 
  { 
    path: 'mis-turnos', 
    component: MisTurnos,
    canActivate: [() => {
      const router = inject(Router);
      return localStorage.getItem('usuario') ? true : router.createUrlTree(['/login']);
    }]
  },
  { path: 'turno', component: Turno }, 
  { path: '**', redirectTo: 'home', pathMatch: 'full' } 
];