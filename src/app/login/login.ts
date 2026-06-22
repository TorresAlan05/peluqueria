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
    // 1. Caso Especial: Administrador
    if (this.miLogin.mail === 'admin@peluqueria.com' && this.miLogin.contra === '123456') {
      localStorage.setItem('rol', 'admin');
      localStorage.setItem('usuario', this.miLogin.mail); // Marcamos la sesión
      this.router.navigateByUrl("admin-dashboard");
      return; 
    }

    // 2. Obtener la lista completa de registrados
    const datosGuardados = localStorage.getItem("usuarios_registrados");
    
    if (!datosGuardados) {
      alert("No hay ningún usuario registrado.");
      return;
    }

    const listaUsuarios: Registros[] = JSON.parse(datosGuardados);

    // 3. Buscar si el mail y contraseña coinciden con alguien en la lista
    const usuarioEncontrado = listaUsuarios.find(u => 
      u.mail === this.miLogin.mail && u.contra === this.miLogin.contra
    );

    if (usuarioEncontrado) {
      console.log("Login exitoso");
      
      // GUARDAMOS EL MAIL PARA QUE EL GUARD SEPA QUE ESTÁS LOGUEADO
      localStorage.setItem('usuario', usuarioEncontrado.mail); 
      localStorage.setItem('rol', 'cliente');
      
      this.router.navigateByUrl("turno"); 
    } else {
      alert("Datos incorrectos o usuario no registrado.");
    }
  } 
}