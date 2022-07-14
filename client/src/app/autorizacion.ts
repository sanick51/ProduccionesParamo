import { Router , CanActivate } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class Autorizacion implements CanActivate{

    constructor(private router: Router){
    }
    canActivate() {
       if(localStorage.getItem("token") != null){
       
           return true;
       }else{
        this.router.navigate(['/']);
        console.log("No autorizado");
        return false;
       }
    }
}
