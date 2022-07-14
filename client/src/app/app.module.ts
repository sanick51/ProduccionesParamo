import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import {  RouterModule } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { DialogoarticuloComponent } from './dialogo-proyecto/dialogo-proyecto.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import { AdminMaterialComponent } from './admin-material/admin-material.component';
import { FormComponent } from './form/form.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductCharacteristicsComponent } from './product-characteristics/product-characteristics.component';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import {SimpleNotificationsModule} from 'angular2-notifications';
import { HistorialProyectComponent } from './historial-proyect/historial-proyect.component';
import { EditProyectComponent } from './edit-proyect/edit-proyect.component';
import { ContainerComponent } from './container/container.component';
import { CupulaComponent } from './cupula/cupula.component';
import { CardComponent } from './card/card.component';
import { MatCardModule } from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RegisterUserComponent } from './register-user/register-user.component';
import { Autorizacion } from './autorizacion';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UsersAdmiComponent } from './users-admi/users-admi.component';
import {MatBadgeModule} from '@angular/material/badge';
import { NotificationsComponent } from './notifications/notifications.component';
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    AdminPageComponent,
    LoginPageComponent,
    DialogoarticuloComponent,
    AdminMaterialComponent,
    FormComponent,
    HeaderComponent,
    FooterComponent,
    ProductCardComponent,
    ProductCharacteristicsComponent,
    AdminHeaderComponent,
    HistorialProyectComponent,
    EditProyectComponent,
    ContainerComponent,
    CupulaComponent,
    CardComponent,
    RegisterUserComponent,
    ImageSliderComponent,
    EditUserComponent,
    UsersAdmiComponent,
    NotificationsComponent,
  ],
  imports: [
    MatSelectModule,
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    FormsModule, 
    MatDialogModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot(),
    MatCardModule,
    MatMenuModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MDBBootstrapModule.forRoot(),
    NgbModule,
    MatBadgeModule,
  ],
  exports: [RouterModule],
  providers: [Autorizacion],
  bootstrap: [AppComponent , HeaderComponent]
})
export class AppModule { }
