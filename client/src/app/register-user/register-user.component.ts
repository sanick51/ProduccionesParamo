import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserLogin } from '../user-login';
import { GlobalConstants } from 'src/common/global-constants';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
   
  name: string = '';
  email: string = '';
  rol: string = '';
  emailReg =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  constructor(public dialogRef: MatDialogRef<RegisterUserComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: UserLogin,
    public http: HttpClient , public service: NotificationsService) {
    
   }

  ngOnInit()  {
  }

  cancelar() {
    this.dialogRef.close();
  }
  
  login() {
    let role = '';
    console.log(this.rol);
    if (this.rol == '1') {
      role = 'Administrador';
    }else if (this.rol == '2') {
      role = 'Usuario';
    }else{
      role = 'Ventas';
    }
    console.log(role);
    if (this.name != '' && this.email != '' && this.rol != '') {
      if(this.validateEmail(this.email)){
        this.http.post(GlobalConstants.API+"Register", { name: this.name, email: this.email, rol: role })
        .subscribe(res => console.log(res));
        this.onSuccess('El usuario recibió un correo con la contraseña y link de activación');
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
