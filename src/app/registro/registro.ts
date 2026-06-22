import { Component } from '@angular/core'; // Ya no necesitás OnInit si no lo usás
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { Registros } from '../templates/templates';

@Component({
  selector: 'app-registro',
  standalone: true, // Asegurate que esto esté presente
  imports: [FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  miRegistro: Registros;

  // Cambiamos 'public' por 'private' y usamos 'router' como nombre estándar
  constructor(private router: Router) {
    this.miRegistro = new Registros();
  }

  ClickRegistros() {
    console.log("Registrando:", this.miRegistro.mail);
    localStorage.setItem("usuario", JSON.stringify(this.miRegistro));

    // Usamos la barra "/" para indicar ruta absoluta desde la raíz
    this.router.navigateByUrl('/turno').then(success => {
      if (!success) {
        console.error("La navegación falló. ¿La ruta '/turno' está definida en app.routes.ts?");
      }
    });
  }
}