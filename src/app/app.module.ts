import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainAppComponent } from './main-app/main-app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';

import { GridComponent } from './main-app/grid/grid.component';
import { ModalUserComponent } from './main-app/modal-user/modal-user.component';
import { ModalApartmentComponent } from './main-app/modal-apartment/modal-apartment.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    MainAppComponent,
    GridComponent,
    ModalUserComponent,
    ModalApartmentComponent
  ],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, MatFormFieldModule,
    MatSelectModule, AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule, ReactiveFormsModule, AngularFireAuthModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
