import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainAppComponent } from './main-app/main-app.component';
import { redirectUnauthorizedTo, canActivate } from '@angular/fire/auth-guard';
import { AuthGuard } from '../app/login/service/auth.guard'

const redirectToLogin = redirectUnauthorizedTo(['login']);


const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'app', component: MainAppComponent, canActivate: [AuthGuard] },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
