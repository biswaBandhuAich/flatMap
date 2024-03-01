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

    async signOut() {
        try {
            sessionStorage.removeItem('rkBuilder-token');
            this.router.navigate(['/login']);
            await this.afAuth.signOut();
        } catch (error) {
            console.error('Error signing out:', error);
            alert('Error Logging Out');
            throw error;
        }
    }

    isAuthenticated() {
        if (sessionStorage.getItem('rkBuilder-token') && this.generator.validateToken(sessionStorage.getItem('rkBuilder-token'))) {
            return true;
        }
        else {
            return false;
        }
    }
}
