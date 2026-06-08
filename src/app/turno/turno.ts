import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-turnos',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule], 
  templateUrl: './turno.html',
  styleUrls: ['./turno.css']
})
export class Turno implements OnInit {
  formTurno!: FormGroup;

  // Listas de opciones para los desplegables (Selects)
  listaServicios: string[] = ['Corte', 'Barba', 'Corte + Barba', 'Coloración + Corte'];
  
  listaDias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  
  listaHoras: string[] = [
    '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Inicializamos el formulario con los nuevos campos requeridos
    this.formTurno = this.fb.group({
      nombre: ['', Validators.required],       
      apellido: ['', Validators.required],     
      servicio: ['', Validators.required], // <-- Nuevo campo
      dia: ['', Validators.required], 
      hora: ['', Validators.required],
      observaciones: ['']             
    });
  }

  onSubmit(): void {
    if (this.formTurno.valid) {
      const datosTurno = this.formTurno.value;
      
      this.guardarEnLocalStorage(datosTurno); 
      this.formTurno.reset({
        servicio: '',
        dia: '',
        hora: ''
      }); // Resetea el formulario y deja los selects por defecto vacíos
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }

  guardarEnLocalStorage(nuevoTurnoObjeto: any) {
    const datosLocales = localStorage.getItem('turnos_peluqueria');
    let listaTurnos: any[] = [];

    if (datosLocales) {
      listaTurnos = JSON.parse(datosLocales);
    }

    listaTurnos.push(nuevoTurnoObjeto);
    localStorage.setItem('turnos_peluqueria', JSON.stringify(listaTurnos, null, 2));

    console.log("%c--- LISTA DE TURNOS ACTUALIZADA ---", "color: #00ff00; font-weight: bold;");
    console.table(listaTurnos); 
    
    alert(`¡Turno de ${nuevoTurnoObjeto.nombre} para ${nuevoTurnoObjeto.servicio} agendado con éxito!`);
  }
}