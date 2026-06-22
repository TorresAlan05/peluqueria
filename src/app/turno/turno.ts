import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router"; 
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
  listaServicios: string[] = ['Corte', 'Barba', 'Corte + Barba', 'Coloración + Corte'];
  listaDias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
  listaHoras: string[] = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.formTurno = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      servicio: ['', Validators.required],
      dia: ['', Validators.required],
      hora: ['', Validators.required],
      observaciones: ['']
    });
  }

  onSubmit(): void {
    if (this.formTurno.valid) {
      this.guardarEnLocalStorage(this.formTurno.value); 
      this.router.navigate(['/mis-turnos']); 
      this.formTurno.reset(); 
    }
  }

  guardarEnLocalStorage(nuevoTurnoObjeto: any) {
    const usuario = localStorage.getItem('usuario');
    const key = `turnos_${usuario}`;
    const datosLocales = localStorage.getItem(key);
    let listaTurnos: any[] = datosLocales ? JSON.parse(datosLocales) : [];

    listaTurnos.push(nuevoTurnoObjeto);
    localStorage.setItem(key, JSON.stringify(listaTurnos, null, 2));
    alert(`¡Turno agendado con éxito!`);
  }
}