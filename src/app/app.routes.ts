import { Routes, Router } from '@angular/router';
import { inject } from '@angular/core';

// Tus componentes
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
    // Aquí implementamos la protección:
    canActivate: [() => {
      const router = inject(Router);
      const usuario = localStorage.getItem('usuario');
      
      // Verificamos si existe usuario logueado
      if (usuario) {
        return true; // Acceso permitido
      } else {
        alert('Debes iniciar sesión para ver tus turnos.');
        router.navigate(['/login']);
        return false; // Bloquea la carga del componente
      }
    }]
  },
  { path: 'turno', component: Turno }, 
  { path: '**', redirectTo: 'home', pathMatch: 'full' } 
];