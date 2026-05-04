import { Component } from '@angular/core';
import { Turnos } from '../templates/templates';
import { Router } from "@angular/router";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-turno',
  imports: [FormsModule],
  templateUrl: './turno.html',
  styleUrl: './turno.css',
})
export class Turno {
    
  listaTurnos: Turnos[] = [];
 nuevoTurno: Turnos;

  constructor(public router: Router) {
    this.nuevoTurno = new Turnos();
    
}
registrarTurno() {
    
    if (this.nuevoTurno.nombre && this.nuevoTurno.apellido && this.nuevoTurno.hora) {
      this.listaTurnos.push({ ...this.nuevoTurno } as Turnos);

      console.log("Turno registrado:", this.nuevoTurno);
      
      this.limpiarCampos();
      
    } else {
      alert("Por favor, completa todos los campos");
    }
  }

  limpiarCampos() {
    this.nuevoTurno = new Turnos();
    this.nuevoTurno.nombre = '';
    this.nuevoTurno.apellido = '';
    this.nuevoTurno.hora = '';
  }
}

