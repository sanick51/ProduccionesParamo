import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { HttpClient } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { GlobalConstants } from 'src/common/global-constants';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  constructor(public http: HttpClient , public service: NotificationsService) { }
  typeC :string = '';

  selectedContact: Contact = new Contact()

  ngOnInit(): void {  
  }

  saveContact() {
    if (this.selectedContact.firstName != '' && this.selectedContact.lastName 
    != '' && this.selectedContact.phone > 10 && this.selectedContact.email != '' && this.selectedContact.type != undefined) {
      if(this.validateEmail(this.selectedContact.email)){
        const body = { name: this.selectedContact.firstName , lastName : this.selectedContact.lastName , 
          email: this.selectedContact.email , phone: this.selectedContact.phone , type: this.selectedContact.type};
          this.onSuccess('Gracias '+ this.selectedContact.firstName +' por interesarte, pronnto nos pondremos en contacto ');
         
          this.http.post(GlobalConstants.API+"Contact", body).subscribe(res => console.log(res));
          this.http.post(GlobalConstants.API+"Contact"+'/Notification', {message: "La persona "+ this.selectedContact.firstName+" identificado con el correo " + this.selectedContact.email+
        " Está interesado en el proyecto " + this.selectedContact.type}).subscribe(res => console.log(res));
        this.selectedContact = new Contact();
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
    this.service.alert('Error', message, {
      postition: ['bottom', 'right'],
      timeOut: 4000,
      animate: 'fade',
      showProgress: true
    });
  }

}
