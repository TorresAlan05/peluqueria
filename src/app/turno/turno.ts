import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule], 
  templateUrl: './turno.html',
  styleUrls: ['./turno.css']
})
export class Turno implements OnInit {
  formTurno!: FormGroup;

  // Adaptado para Peluquería (ngModel)
  public nuevoTurno = {
    nombre: '',
    apellido: '',
    dia: '',
    hora: ''
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Adaptado para Peluquería (Formulario Reactivo)
    this.formTurno = this.fb.group({
      nombre: ['', Validators.required],       // 👈 Cambiado a 'nombre'
      apellido: ['', Validators.required],     // 👈 Agregado apellido
      dia: ['', Validators.required], 
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      observaciones: ['']                      // (Ej. "Corte y tintura")
    });
  }

  // Si usas el Formulario Reactivo
  onSubmit(): void {
    if (this.formTurno.valid) {
      const datosTurno = this.formTurno.value;
      
      // Guardamos el turno de peluquería
      this.guardarEnLocalStorage(datosTurno); 
      
      this.formTurno.reset();
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }

  // Si usas ngModel
  registrarTurno() {
    // Guardamos una copia del objeto actual
    this.guardarEnLocalStorage({ ...this.nuevoTurno });
    
    // Limpiamos el formulario para el próximo cliente
    this.nuevoTurno = { nombre: '', apellido: '', dia: '', hora: '' };
  }

  // Función encargada de agrupar todo en el array y mostrarlo en consola
  guardarEnLocalStorage(nuevoTurnoObjeto: any) {
    // 1. Obtenemos lo que ya esté guardado o empezamos con un array vacío
    const datosLocales = localStorage.getItem('turnos_peluqueria');
    let listaTurnos: any[] = [];

    if (datosLocales) {
      listaTurnos = JSON.parse(datosLocales);
    }

    // 2. Agregamos el nuevo turno de peluquería al array
    listaTurnos.push(nuevoTurnoObjeto);

    // 3. Guardamos el array actualizado en el LocalStorage
    localStorage.setItem('turnos_peluqueria', JSON.stringify(listaTurnos, null, 2));

    // 4. 🔥 MUESTRA TODOS LOS DATOS ACUMULADOS EN LA CONSOLA 🔥
    console.log("%c--- LISTA DE TURNOS ACTUALIZADA ---", "color: #00ff00; font-weight: bold;");
    console.table(listaTurnos); // Muestra los datos en una tabla hermosa en la consola
    
    alert(`¡Turno de ${nuevoTurnoObjeto.nombre} agendado con éxito!`);
  }
}