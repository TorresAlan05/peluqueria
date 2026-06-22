import { Component } from '@angular/core';
import { Registros } from '../templates/templates';
import { Router, RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  miLogin: Registros;

  constructor(public router: Router) {
    this.miLogin = new Registros();
  }

  login() {
    console.log("Mail ingresado:", this.miLogin.mail);
    console.log("Contra ingresada:", this.miLogin.contra);

    // 1. Comprobar si es el Admin
    if (this.miLogin.mail === 'admin@peluqueria.com' && this.miLogin.contra === '123456') {
      console.log("¡Ingreso correcto como Administrador!");
      localStorage.setItem('rol', 'admin');
      this.router.navigateByUrl("admin-dashboard"); 
      return; 
    }

  
    const usuarioGuardado = localStorage.getItem("usuario");

    if (usuarioGuardado) {
      const usuario: Registros = JSON.parse(usuarioGuardado);

      if (this.miLogin.mail === usuario.mail && this.miLogin.contra === usuario.contra) {
        console.log("Login correcto como cliente");
        localStorage.setItem('rol', 'cliente');
        this.router.navigateByUrl("turno"); 
      } else {
        alert("Datos incorrectos");
      }
    } else {
      alert("No hay ningún usuario registrado en este navegador todavía.");
    }
  } 
} 