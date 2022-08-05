import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalConstants } from 'src/common/global-constants';

@Component({
  selector: 'app-material-dialog',
  templateUrl: './material-dialog.component.html',
  styleUrls: ['./material-dialog.component.scss']
})
export class MaterialDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<MaterialDialogComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: any, 
    public http: HttpClient ) { }
    id : number = 0;
    valor : number = 0;
  ngOnInit(): void {
  
  }

  cancelar() {
    this.dialogRef.close();
  }


  aceptar(){
    this.http.post(GlobalConstants.API+"Material/AddMaterial", {id: this.data.id, valor: this.valor , idMat: this.id}).subscribe( (data) => {
      this.dialogRef.close();
    }
    );

  }
}
