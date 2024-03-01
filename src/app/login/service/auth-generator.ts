import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment'
import * as CryptoJS from 'crypto-js';



@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router
    ) { }

    async signInWithEmailAndPassword(email: string, password: string) {
        try {
            const result = await this.afAuth.signInWithEmailAndPassword(email, password);
            const token = this.generateToken(result.user.uid);
            sessionStorage.setItem('rkBuilder-token', token);
            return true;
        } catch (error) {
            alert('Invalid Credential');
            console.log(error)
            this.router.navigate(['/login']);
            return false;
        }
    }

    generateToken(userId: string): string {
        const secretKey = environment.SECRET_KEY;
        if (!secretKey) {
            throw new Error('Secret key not found in environment variables');
        }
        const payload = { userId: userId, exp: Math.floor(Date.now() / 1000) + (60 * 60) };
        const tokenPayload = Buffer.from(JSON.stringify(payload)).toString('base64');
        const hmac = CryptoJS.HmacSHA256(tokenPayload, secretKey).toString(CryptoJS.enc.Base64);
        const token = tokenPayload + '.' + hmac;
        return token;
    }

    validateToken(token: string): boolean {
        const secretKey = environment.SECRET_KEY;
        if (!secretKey) {
            throw new Error('Secret key not found in environment variables');
        }
        const parts = token.split('.');
        if (parts.length !== 2) {
            console.log('Invalid token format');
            return false;
        }
        const [tokenPayload, tokenHmac] = parts;
        const calculatedHmac = CryptoJS.HmacSHA256(tokenPayload, secretKey).toString(CryptoJS.enc.Base64);
        if (calculatedHmac !== tokenHmac) {
            console.log('Token has been tampered with');
            return false;
        }
        const decodedPayload = Buffer.from(tokenPayload, 'base64').toString('utf-8');
        const payload = JSON.parse(decodedPayload);
        const currentTime = Math.floor(Date.now() / 1000);
        if (currentTime >= payload.exp) {
            console.log('Token has expired');
            return false;
        }
        console.log('Token is valid');
        return true;

    }

}
