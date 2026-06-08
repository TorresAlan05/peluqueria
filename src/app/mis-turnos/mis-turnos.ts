import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mis-turnos.html',
  styleUrls: ['./mis-turnos.css'] // Abajo te dejo los estilos por si querés modularizarlos
})
export class MisTurnos implements OnInit {
  listaTurnos: any[] = [];

  ngOnInit(): void {
    this.cargarTurnos();
  }

  cargarTurnos(): void {
    const datosLocales = localStorage.getItem('turnos_peluqueria');
    if (datosLocales) {
      this.listaTurnos = JSON.parse(datosLocales);
    }
  }

  // Función extra por si quieren agregar un botón para limpiar el historial
  borrarTodosLosTurnos(): void {
    if (confirm('¿Estás seguro de que querés borrar todos los turnos agendados?')) {
      localStorage.removeItem('turnos_peluqueria');
      this.listaTurnos = [];
    }
  }
}