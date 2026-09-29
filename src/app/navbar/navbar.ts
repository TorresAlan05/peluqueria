import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(private router: Router) {}

  reservarTurno() {
    const usuario = localStorage.getItem('usuario');
    const haySesion = usuario && usuario !== 'null' && usuario !== 'undefined';

    this.router.navigateByUrl(haySesion ? '/turno' : '/registro');
  }
}