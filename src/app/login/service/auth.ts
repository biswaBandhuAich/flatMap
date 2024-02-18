// authentication.service.ts

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth-generator';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    user: Observable<firebase.default.User>;

    constructor(private afAuth: AngularFireAuth, private generator: AuthService, private router: Router) {
        this.user = afAuth.authState;
    }

    signIn(email: string, password: string) {
        return this.generator.signInWithEmailAndPassword(email, password);
    }

    signOut() {
        this.afAuth.signOut();
        localStorage.removeItem('rkBuilder-token')
        this.router.navigate(['/login']);
    }

    isAuthenticated() {
        if (localStorage.getItem('rkBuilder-token') && this.generator.validateToken(localStorage.getItem('rkBuilder-token'))) {
            return true;
        }
        else {
            return false;
        }
    }
}
