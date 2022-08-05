import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationsService } from 'angular2-notifications';
import { UserLogin } from '../user-login';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  validation: boolean = false;
  password: string = '';
  cPassword : string = '';

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: UserLogin,
    public service: NotificationsService) {
    }

  ngOnInit() {
    this.validatePersmission();
  }

  validatePersmission(){
    if(this.data.rol != ''){
      this.validation = true;
    }else{
      this.validation = false;
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

  send(){
    
    if(this.data.rol != ''){
      if(this.data.nombre != ''){
        if(this.validateEmail(this.data.email)){
          if(this.data.rol != 'A'){
            this.onSuccess('Usuario actualizado correctamente');
            this.dialogRef.close(this.data);
          }else{
            this.onError('Por favor seleccione un rol');
          }
        }else{
          this.onError('El correo no es valido');
        }
      }else{
        this.onError('El nombre no puede estar vacio');
      }
    }else{
    if(this.password == this.cPassword){
     if(this.data.nombre != ''){
      this.data.contrasenia = this.password;
      this.dialogRef.close(this.data);
     }else{
      this.onError('El nombre no puede estar vacio');
     }
    }else{
      this.onError('Las contraseñas no coinciden');
    }
  }
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

  validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}


