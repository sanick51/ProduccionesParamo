import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/common/global-constants';

@Component({
  selector: 'app-history-buy',
  templateUrl: './history-buy.component.html',
  styleUrls: ['./history-buy.component.css']
})
export class HistoryBuyComponent implements OnInit {
  datos: any []=[];

  columnas: string[] = ['id', 'Correo', 'Fecha' , 'Material', 'Total' ];
  constructor( public http: HttpClient) { }

  ngOnInit(): void {
    this.fillProyects();
  }

  fillProyects () {
    this.http.get<any[]>(GlobalConstants.API+"BuyHistory").subscribe( (data : any[]) => {
    console.log(data[0]);
    this.datos = data;
  }
  );
  }
}
