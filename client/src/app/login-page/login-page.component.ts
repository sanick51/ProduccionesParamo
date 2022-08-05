import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
  import {Router} from "@angular/router"
import { User } from '../user';

import { NotificationsService } from 'angular2-notifications';
import { GlobalConstants } from 'src/common/global-constants';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent  {
   email: string = '';
  password: string = '';
  imageSrc = '/assets/img/Logo.svg'; 
  imageAlt = 'Logo'; 
  constructor(public http: HttpClient , private router: Router , public service: NotificationsService) { }

  login() {
    if(this.email != '' && this.password != ''){
      if(this.validateEmail(this.email)){
          const body = { email: this.email, password: this.password };
          this.http.post<User>(GlobalConstants.API+"Login", body )
          .subscribe((response: User) => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('rol', response.rol); 
            localStorage.setItem('email', response.email);
            this.router.navigate(['/Projects']);
        },
        (error: HttpErrorResponse) => {
          this.onError('Usuario o contraseña incorrectos');
        });
      }else{
        this.onError('Email invalido');
      }
    }else{
      this.onError('Todos los campos son obligatorios');
    }
  }

  validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  onSuccess(message: any){
    this.service.success('Completado', message, {
      postition: ['bottom', 'right'],
      timeOut: 2000,
      animate: 'fade',
      showProgress: true
    });
  }

  onError(message: any){
    this.service.error('Error', message, {
      postition: ['bottom', 'right'],
      timeOut: 4000,
      animate: 'fade',
      showProgress: true
    });
  }
}
