import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Turno {
  nombre: string;
  apellido: string;
  mail: string;
  servicio: string;
  fecha: string; // Ej: "2026-06-24"
  dia: string;   // Ej: "Miércoles"
  hora: string;
  estado: 'Confirmado' | 'Pendiente';
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './admin.html',  
  styleUrl: './admin.css'       
})
export class Admin implements OnInit { 
  
  listaTurnos: Turno[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    const rol = localStorage.getItem('rol');
    if (rol !== 'admin') {
      this.router.navigateByUrl('login');
      return;
    }
    this.cargarTurnos();
  }

  cargarTurnos(): void {
    const datosLocales = localStorage.getItem('turnos_peluqueria');
    if (datosLocales) {
      this.listaTurnos = JSON.parse(datosLocales);
    }
  }

  cerrarSesion() {
    localStorage.removeItem('rol');
    this.router.navigateByUrl('login');
  }
}