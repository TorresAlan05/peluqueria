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
   
    if (this.miLogin.mail === 'admin@peluqueria.com' && this.miLogin.contra === '123456') {
      localStorage.setItem('rol', 'admin');
      localStorage.setItem('usuario', this.miLogin.mail); 
      this.router.navigateByUrl("admin-dashboard");
      return; 
    }

   
    const datosGuardados = localStorage.getItem("usuarios_registrados");
    
    if (!datosGuardados) {
      alert("No hay ningún usuario registrado.");
      return;
    }

    const listaUsuarios: Registros[] = JSON.parse(datosGuardados);

    
    const usuarioEncontrado = listaUsuarios.find(u => 
      u.mail === this.miLogin.mail && u.contra === this.miLogin.contra
    );

    if (usuarioEncontrado) {
      
      console.log("Login exitoso");
      
    
      localStorage.setItem('usuario', usuarioEncontrado.mail); 
      localStorage.setItem('rol', 'cliente');
      
      const turnosGuardados = localStorage.getItem(`turnos_${usuarioEncontrado.mail}`);
      const listaTurnos = turnosGuardados ? JSON.parse(turnosGuardados) : [];
      this.router.navigateByUrl(listaTurnos.length > 0 ? "mis-turnos" : "turno"); 
    } else {
      alert("Datos incorrectos o usuario no registrado.");
    }
  } 
}