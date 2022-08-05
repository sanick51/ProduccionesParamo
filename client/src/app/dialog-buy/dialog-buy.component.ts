import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalConstants } from 'src/common/global-constants';

@Component({
  selector: 'app-dialog-buy',
  templateUrl: './dialog-buy.component.html',
  styleUrls: ['./dialog-buy.component.scss']
})
export class DialogBuyComponent implements OnInit {
  valor : number = 0;
  cantidad : number = 0;
  validate ='';

  constructor(public dialogRef: MatDialogRef<DialogBuyComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: any, 
    public http: HttpClient ) { }
    
  ngOnInit(): void {
    this.validate = this.data.type;
  }

  cancelar() {
    this.dialogRef.close();
  }

  aceptar(){
    console.log(this.data);
    this.http.post(GlobalConstants.API+"Material/BuyMaterial", {correo: localStorage.getItem('email') ,nombre: this.data.data.NOMBRE, valor:this.valor , id: this.data.id , cantidad: this.cantidad}).subscribe( (data) => {
      this.dialogRef.close();
    }
    );
    window.location.reload();
  }

}
