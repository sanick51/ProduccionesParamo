import { Component, Input, OnInit } from '@angular/core';
import{ GlobalConstants } from '../../common/global-constants';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
  
@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css'],
  providers: [NgbCarouselConfig]
})
export class ImageSliderComponent implements OnInit {
  @Input() type: string = '';
  images: string [] = [];
  
  constructor(config: NgbCarouselConfig) {
    config.interval = 5000;  
    config.wrap = true;  
    config.keyboard = false;  
    config.pauseOnHover = false;  
   }

  ngOnInit(): void {
    this.validateImages();
  }

  validateImages(){
    if(this.type == 'cabania'){
      this.images = GlobalConstants.cabaniaImg;
    }else if(this.type == 'container'){
      this.images = GlobalConstants.containerImg;
    }else{
      this.images = GlobalConstants.cupulaImg;
    }
  }
}
