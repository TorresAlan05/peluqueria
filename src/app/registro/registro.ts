import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router,RouterLink } from "@angular/router";
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
    // hacer la parte del registro
    //  console.log( " usuario ya registrado ");
    console.log(this.miRegistro.mail, this.miRegistro.contra, this.miRegistro.contra2);
    this.route.navigateByUrl("login");
    }
}
