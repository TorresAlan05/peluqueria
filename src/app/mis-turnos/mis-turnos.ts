import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // <-- Importante para usar [(ngModel)] al editar

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], // <-- Agregamos FormsModule aquí
  templateUrl: './mis-turnos.html',
  styleUrls: ['./mis-turnos.css'] 
})
export class MisTurnos implements OnInit {
  listaTurnos: any[] = [];
  
  // Controlan qué turno se está editando en la lista
  indiceEditando: number = -1; 
  turnoEditado: any = {};

  // Listas de opciones idénticas a tu formulario principal
  listaServicios: string[] = ['Corte', 'Barba', 'Corte + Barba', 'Coloración + Corte'];
  listaDias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  listaHoras: string[] = [
    '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  ngOnInit(): void {
    this.cargarTurnos();
  }

  cargarTurnos(): void {
    const datosLocales = localStorage.getItem('turnos_peluqueria');
    if (datosLocales) {
      this.listaTurnos = JSON.parse(datosLocales);
    }
  }

  // --- NUEVA FUNCIONALIDAD: ELIMINAR UN TURNO ---
  eliminarTurno(index: number): void {
    const turno = this.listaTurnos[index];
    const confirmar = confirm(`¿Estás seguro de que deseas eliminar el turno de ${turno.nombre}?`);
    
    if (confirmar) {
      this.listaTurnos.splice(index, 1); // Remueve el turno del array
      this.actualizarLocalStorage();
    }
  }

  // --- NUEVA FUNCIONALIDAD: EDITAR DESDE LA LISTA ---
  habilitarEdicion(index: number): void {
    this.indiceEditando = index;
    // Creamos una copia para no alterar el original hasta que el usuario guarde
    this.turnoEditado = { ...this.listaTurnos[index] }; 
  }

  cancelarEdicion(): void {
    this.indiceEditando = -1;
    this.turnoEditado = {};
  }

  guardarEdicion(index: number): void {
    // Reemplazamos el turno viejo por el editado
    this.listaTurnos[index] = { ...this.turnoEditado };
    this.actualizarLocalStorage();
    this.cancelarEdicion();
    alert('Turno modificado con éxito.');
  }

  // Tu función original de limpiar historial (actualizada para usar el método auxiliar)
  borrarTodosLosTurnos(): void {
    if (confirm('¿Estás seguro de que querés borrar todos los turnos agendados?')) {
      this.listaTurnos = [];
      this.actualizarLocalStorage();
    }
  }

  // Método auxiliar para mantener limpio el LocalStorage
  private actualizarLocalStorage(): void {
    if (this.listaTurnos.length > 0) {
      localStorage.setItem('turnos_peluqueria', JSON.stringify(this.listaTurnos, null, 2));
    } else {
      localStorage.removeItem('turnos_peluqueria'); // Si no quedan turnos, borra la clave
    }
  }


  
}