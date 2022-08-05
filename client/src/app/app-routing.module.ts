import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { AdminPageComponent } from './admin-page/admin-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HistorialProyectComponent } from './historial-proyect/historial-proyect.component';
import { ContainerComponent } from './container/container.component';
import { CupulaComponent } from './cupula/cupula.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { Autorizacion } from './autorizacion';
import { UsersAdmiComponent } from './users-admi/users-admi.component';
import { AdminMaterialComponent } from './admin-material/admin-material.component';
import { HistoryBuyComponent } from './history-buy/history-buy.component';
import { HomePageComponent } from './home-page/home-page.component';

const routes: Routes = [
  { path: 'Home', component: HomePageComponent },
  { path: 'Cabañas', component: MainPageComponent },
  { path: 'Login', component: LoginPageComponent },
  { path: 'Container', component: ContainerComponent },
  { path: 'Cupula', component: CupulaComponent },
  { path: 'ProjectHistory', component: HistorialProyectComponent , canActivate: [Autorizacion] },
  { path: 'Projects', component: AdminPageComponent, canActivate: [Autorizacion]   },
  { path: 'Users', component: UsersAdmiComponent, canActivate: [Autorizacion]  },
  { path: 'Material/:id', component: AdminMaterialComponent , canActivate: [Autorizacion]  },
  { path: 'HistoryBuy', component: HistoryBuyComponent , canActivate: [Autorizacion]  },
  { path: '**', component: MainPageComponent },
];

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }