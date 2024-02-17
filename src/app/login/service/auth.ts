// authentication.service.ts

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    user: Observable<firebase.default.User>;

    constructor(private afAuth: AngularFireAuth, private router: Router) {
        this.user = afAuth.authState;
    }

    signIn(email: string, password: string) {
        return this.afAuth.signInWithEmailAndPassword(email, password).then(() => {
            localStorage.setItem('rkBuilder-token', 'true');
            this.router.navigate(['/app'])
        }, err => {
            alert('Invalid Credential');
            this.router.navigate(['/login'])
        });;
    }

    signOut(): Promise<void> {
        return this.afAuth.signOut();
    }

    isAuthenticated() {
        if (localStorage.getItem('rkBuilder-token')) {
            return true;
        }
        else {
            return false;
        }
    }
}
