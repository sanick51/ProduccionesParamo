import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GlobalConstants } from 'src/common/global-constants';
import { DialogBuyComponent } from '../dialog-buy/dialog-buy.component';
import { Material } from '../material';
import { MaterialDialogComponent } from '../material-dialog/material-dialog.component';

@Component({
  selector: 'app-admin-material',
  templateUrl: './admin-material.component.html',
  styleUrls: ['./admin-material.component.css']
})
export class AdminMaterialComponent implements OnInit {
  private routeSub: Subscription | undefined;
  public MaterialAll : Material[] = [];
  columnasInventario: string[] = ['Nombre', 'Unidad', 'Cantidad', 'Acciones' ];
  id : number = 0;

  constructor(public http: HttpClient , private route: ActivatedRoute , public dialog: MatDialog ) { }
  dataMaterial : Material[] = [];

  ngOnInit(): void {
    this.requestMaterial();
    this.requestAllMaterial();
  }

  requestAllMaterial(){
    this.http.get<Material[]>(GlobalConstants.API+"Proyects"+'/AllMaterial').subscribe( (data : Material[]) => {
    this.MaterialAll = data;
    console.log(this.MaterialAll);
  });
}

    requestMaterial(){
      this.routeSub = this.route.params.subscribe(params => {
        this.id = params['id'];
        this.http.post<Material[]>(GlobalConstants.API+"Proyects"+'/RequestMaterial', {id: params['id']})
        .subscribe((data : Material[]) => 
            this.dataMaterial = data
        );
      });
    }

  abrirDialogo(){
    const dialogo1 = this.dialog.open(MaterialDialogComponent, {
      data : {data: this.MaterialAll , id:this.id},
      height: '50%',
      width: '20%',
     });
     dialogo1.afterClosed().subscribe(art => {
      window.location.reload();
    });
  }

  ComprarParte(id : number){
    const dialogo1 = this.dialog.open(DialogBuyComponent, {
      data : {data : this.dataMaterial[id], type: 'parte' , id: this.id},
      height: '40%',
      width: '20%',
     });
     dialogo1.afterClosed().subscribe(art => {
      
    });
  }

  ComprarTodo(id : number){
    const dialogo1 = this.dialog.open(DialogBuyComponent, {
      data : {data : this.dataMaterial[id], type: 'todo' ,id: this.id},
      height: '40%',
      width: '20%',
     });
     dialogo1.afterClosed().subscribe(art => {
      
    });
  }

  Eliminar(id : number){
    const mat = this.dataMaterial[id];
    console.log(mat);
    this.routeSub = this.route.params.subscribe(params => {
      this.http.post(GlobalConstants.API+"Proyects"+'/DeleteMaterial', {id: params['id'] , mat: mat.NOMBRE})
      .subscribe(data  => 
          console.log(data)
      );
    });
    window.location.reload();
  }

}
