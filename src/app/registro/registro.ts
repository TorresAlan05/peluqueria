import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { Registros } from '../templates/templates';

@Component({
  selector: 'app-registro',
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
  
export class Registro{
    miRegistro:Registros;

  constructor(public route:Router) {
     this.miRegistro = new Registros;
   }

   ClickRegistros(){
    // 1. Obtener la lista actual (si existe)
    const datosGuardados = localStorage.getItem("usuarios_registrados");
    const listaUsuarios: Registros[] = datosGuardados ? JSON.parse(datosGuardados) : [];

    // 2. Agregar el nuevo registro
    listaUsuarios.push(this.miRegistro);

    // 3. Guardar la lista completa (NO sobrescribir el usuario único)
    localStorage.setItem("usuarios_registrados", JSON.stringify(listaUsuarios));

    console.log("Usuario registrado:", this.miRegistro.mail);
    this.route.navigateByUrl("login"); // Mejor llevarlo al login
}
}
