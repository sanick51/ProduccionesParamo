import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Material } from '../material';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent  {
  API = "http://localhost:3000/Login";
  email: string = '';
  password: string = '';

  constructor(public http: HttpClient , private router: Router) { }

  updateProyect(proyecto:Material){
    const body = {};
      return this.http.get(this.API, body);
  }

  login() {
    const body = { email: this.email, password: this.password };
    this.http.post(this.API, body ,  {observe: 'response'})
    .subscribe((response) => {
     this.router.navigate(['/Proyects']);
  },
  (error: HttpErrorResponse) => {
    alert('Usuario o contraseña incorrectos');
  });
  }

}
