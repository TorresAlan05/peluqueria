import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Turno {
  cliente: string;
  mail: string;
  servicio: string;
  barbero: string;
  fecha: string;
  hora: string;
  estado: 'Confirmado' | 'Pendiente';
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [], 
  templateUrl: './admin.html',  // <- Corregido: sin el "admin/"
  styleUrl: './admin.css'       // <- Corregido: sin el "admin/"
})
export class Admin implements OnInit { // <- Corregido: Se llama Admin para coincidir con el spec.ts
  
  listaTurnos: Turno[] = [
    { cliente: 'Carlos Gómez', mail: 'carlos@gmail.com', servicio: 'Corte Clásico & Barba', barbero: 'Alan', fecha: '24/06/2026', hora: '16:30 hs', estado: 'Confirmado' },
    { cliente: 'Lucas Rodríguez', mail: 'lucas@gmail.com', servicio: 'Color & Diseño Urbano', barbero: 'Matías', fecha: '24/06/2026', hora: '18:00 hs', estado: 'Pendiente' },
    { cliente: 'Juan Perez', mail: 'juan@gmail.com', servicio: 'Perfilado de Barba', barbero: 'Alan', fecha: '25/06/2026', hora: '10:00 hs', estado: 'Confirmado' },
    { cliente: 'Mateo Diaz', mail: 'mateo@gmail.com', servicio: 'Corte Infantil', barbero: 'Matías', fecha: '25/06/2026', hora: '11:15 hs', estado: 'Confirmado' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {
    const rol = localStorage.getItem('rol');
    if (rol !== 'admin') {
      this.router.navigateByUrl('login');
    }
  }

  cerrarSesion() {
    localStorage.removeItem('rol');
    this.router.navigateByUrl('login');
  }
}