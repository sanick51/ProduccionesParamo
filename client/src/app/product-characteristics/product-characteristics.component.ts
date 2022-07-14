import { Component, Input, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/common/global-constants';
import { Characteristic } from '../characteristic';

@Component({
  selector: 'app-product-characteristics',
  templateUrl: './product-characteristics.component.html',
  styleUrls: ['./product-characteristics.component.css']
})
export class ProductCharacteristicsComponent implements OnInit {
  @Input() type: string = '';
  charactaristics: Characteristic [] = [];
  constructor() { }

  ngOnInit(): void {
    this.loadCharacteristics();
  }

  loadCharacteristics(){
    if(this.type == 'cabania'){
      this.charactaristics = GlobalConstants.cabaniaCharacteristics;
    }else if(this.type == 'container'){
      this.charactaristics = GlobalConstants.cabaniaCharacteristics;
     // this.charactaristics = GlobalConstants.containerCharacteristics;
    }else{
      this.charactaristics = GlobalConstants.cabaniaCharacteristics;
      // this.charactaristics = GlobalConstants.cupulaCharacteristics;
    }
  }
}
