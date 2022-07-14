import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { UserLogin } from '../user-login';

@Component({
  selector: 'app-users-admi',
  templateUrl: './users-admi.component.html',
  styleUrls: ['./users-admi.component.css']
})
export class UsersAdmiComponent implements OnInit {
  columnas: string[] = ['Codigo','Nombre', 'Correo', 'Permisos' , 'Estado' , 'Acciones'];
  API = "http://localhost:3000/User";
  datos: UserLogin []=[];
  constructor(public http: HttpClient , public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.fillUsers();
  }

  fillUsers () {
    this.http.get<UserLogin[]>(this.API).subscribe( (data : UserLogin[]) => {
    this.datos = data;
    console.log(this.datos);
  }
  );
  }
  editUser(id: number) {
    const User = this.datos[id];
    const dialogo1 = this.dialog.open(EditUserComponent, {
      data : new UserLogin(User.nombre , '', 'A' , User.email),
      height: '50%',
      width: '30%',
     });
 
 
     dialogo1.afterClosed().subscribe((art: UserLogin) => {
      this.datos[id].nombre = art.nombre;
      this.datos[id].email = art.email;
      this.datos[id].rol = art.rol;
      const body = {
        id: this.datos[id],
        name: art.nombre ,
        email : art.email,
        rol : this.validatePersmission(art.rol)
      }
      this.http.put(this.API + '/adm', body).subscribe(
        (data: any) => {
          console.log(data);
        }
      );
      window.location.reload();
     });
  }

  validatePersmission(per: string){
    if(per == '1'){
      return 'Administrador';
    }else if(per == '2'){
      return 'Usuario';
    }else{
      return 'Ventas';
    }
  }
  abrirDialogo() {
    const dialogo1 = this.dialog.open(RegisterUserComponent, {
     data : new UserLogin('' , '', '' , ''),
     height: '0%',
     width: '0%',

    });
  }
   

}
