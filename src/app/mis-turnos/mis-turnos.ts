import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router'; 
import { FormsModule } from '@angular/forms'; 

interface Turno {
  nombre: string;
  apellido: string;
  mail: string;
  servicio: string;
  fecha: string;
  dia: string;
  hora: string;
  estado: 'Confirmado' | 'Pendiente';
  observaciones?: string;
}

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], 
  templateUrl: './mis-turnos.html',
  styleUrls: ['./mis-turnos.css'] 
})
export class MisTurnos implements OnInit {
  listaTurnos: Turno[] = [];
  
  constructor(private router: Router) {} 

  indiceEditando: number = -1; 
  turnoEditado: Partial<Turno> = {};

  listaServicios: string[] = ['Corte', 'Barba', 'Corte + Barba', 'Coloración + Corte'];
  listaDias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  listaHoras: string[] = [
    '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  // Helper para obtener la llave dinámica del usuario logueado
  private getStorageKey(): string {
    const usuario = localStorage.getItem('usuario');
    return `turnos_${usuario}`;
  }

  ngOnInit(): void {
    const usuarioLogueado = localStorage.getItem('usuario');
    
    if (!usuarioLogueado || usuarioLogueado === 'null' || usuarioLogueado === 'undefined') {
      alert('Debes iniciar sesión para ver tus turnos.');
      this.router.navigate(['/login']);
      return; 
    }

    this.cargarTurnos();
  }

cerrarSesion(): void {
  if (confirm('¿Estás seguro que deseas cerrar sesión?')) {
    // BORRAMOS SOLO LA LLAVE DE SESIÓN
    localStorage.removeItem('usuario'); 
    
    // NUNCA toques 'usuarios' (tu lista de registrados) 
    // ni otras llaves que no sean la del usuario actual.
    
    this.router.navigate(['/login']);
  }
}

  cargarTurnos(): void {
    const datosLocales = localStorage.getItem(this.getStorageKey());
    if (datosLocales) {
      this.listaTurnos = JSON.parse(datosLocales);
    }
  }

  eliminarTurno(index: number): void {
    const turno = this.listaTurnos[index];
    const confirmar = confirm(`¿Estás seguro de que deseas eliminar el turno de ${turno.nombre} ${turno.apellido}?`);
    if (confirmar) {
      this.listaTurnos.splice(index, 1); 
      this.actualizarLocalStorage();
    }
  }

  habilitarEdicion(index: number): void {
    this.indiceEditando = index;
    this.turnoEditado = { ...this.listaTurnos[index] }; 
  }

  cancelarEdicion(): void {
    this.indiceEditando = -1;
    this.turnoEditado = {};
  }

  guardarEdicion(index: number): void {
    this.listaTurnos[index] = { ...this.turnoEditado } as Turno;
    this.actualizarLocalStorage();
    this.cancelarEdicion();
    alert('Turno modificado con éxito.');
  }

  borrarTodosLosTurnos(): void {
    if (confirm('¿Estás seguro de que querés borrar todos los turnos agendados?')) {
      this.listaTurnos = [];
      this.actualizarLocalStorage();
    }
  }

  private actualizarLocalStorage(): void {
    const key = this.getStorageKey();
    if (this.listaTurnos.length > 0) {
      localStorage.setItem(key, JSON.stringify(this.listaTurnos, null, 2));
    } else {
      localStorage.removeItem(key); 
    }
  }
}