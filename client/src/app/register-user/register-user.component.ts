import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  API = "http://localhost:3000/Register";
  name: string = '';
  email: string = '';
  rol: string = '';
  constructor( public http: HttpClient) { }

  ngOnInit(): void {
  }

  login() {
    let role = '';
    if (this.rol == 'Administrador') {
      role = 'A';
    }else if (this.rol == 'Usuario') {
      role = 'U';
    }else{
      role = 'V';
    }
    this.http.post(this.API, { name: this.name, email: this.email, rol: role })
    .subscribe(res => console.log(res));
  }

}
