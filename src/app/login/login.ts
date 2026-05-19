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


export class Login{
    miLogin: Registros;


constructor(public router: Router) {
  this.miLogin = new Registros();


}

 login(){
    const usuarioGuardado = localStorage.getItem("usuario");

    if(usuarioGuardado){
      const usuario: Registros = JSON.parse(usuarioGuardado);

      if(this.miLogin.mail === usuario.mail && this.miLogin.contra === usuario.contra){
        console.log("Login correcto");
        this.router.navigateByUrl("turno");
      } else {
        alert("Datos incorrectos");
      }
    } else {
      alert("No hay usuario registrado");
    }
  }
}



