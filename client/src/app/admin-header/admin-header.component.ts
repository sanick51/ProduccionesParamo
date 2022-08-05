import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificationsService } from 'angular2-notifications';
import { GlobalConstants } from 'src/common/global-constants';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { Notification } from '../notification';
import { UserLogin } from '../user-login';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent implements OnInit {
  notifications : number = 0;
  validation = false;
  dialog: any;
  listNotifications: Notification [] =[];

  constructor(public dialogEdit:MatDialog , public service: NotificationsService,
    public http: HttpClient
    )  { }

  ngOnInit(): void {
    this.validatePersmission();
    this.fillNotifications();
  }

  fillNotifications(){
    this.http.get<Notification[]>(GlobalConstants.API+"Notification"+':'+localStorage.getItem('email') ).subscribe( (data : Notification[]) => {
      this.listNotifications = data;
      console.log(this.listNotifications);
      this.notifications = this.listNotifications.length;
    });
  }

  validatePersmission(){
    let perrmission = localStorage.getItem('rol');
    console.log(perrmission);
    if(perrmission == 'A'){
      this.validation = true;
    }
  }


  logout(){
    localStorage.clear();
  }

  viewNotification(notif : Notification){
    this.listNotifications.forEach( (item, index) => {
      if(item === notif) this.listNotifications.splice(index,1);
    });
    this.http.post(GlobalConstants.API+"Notification" + '/update', {id:notif.ID}).subscribe(
      (data: any) => {
       // console.log(data);
      }
    );
    window.location.reload();
    this.notifications = this.listNotifications.length;
  }
  
  abrirDialogo() {
    const dialogo1 = this.dialogEdit.open(EditUserComponent, {
      panelClass: 'my-dialog',
     data : new UserLogin('' , '', '' , ''),
     height: '60%',
     width: '300px',
    });


    dialogo1.afterClosed().subscribe((art: UserLogin) => {
      if (art != undefined){
        const body = { name: art.nombre , password:art.contrasenia , email: localStorage.getItem('email')};
        if(art.nombre != '' && art.contrasenia == ''){
          this.onSuccess('Usuario editado correctamente');
        }else if(art.nombre != '' && art.contrasenia != ''){
          this.onSuccess('Usuario editado y contraseña correctamente');
        }
        this.http.post('http://localhost:3000/api/user/edit', body).subscribe(
          (data: any) => {
            console.log(data);
          }
        );
      }
    });
  }

  
  onSuccess(message: any){
    this.service.success('Completado', message, {
      postition: ['bottom', 'right'],
      timeOut: 2000,
      animate: 'fade',
      showProgress: true
    });
  }

}
