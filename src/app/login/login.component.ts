import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './service/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './service/auth-generator';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginControlForm: FormGroup;
  loggedIn: boolean;

  constructor(private authService: AuthenticationService, private fb: FormBuilder, private router: Router, private authGen: AuthService) {
    if (sessionStorage.getItem('rkBuilder-token') && this.authGen.validateToken(sessionStorage.getItem('rkBuilder-token'))) {
      this.router.navigate(['/app'])
    }
  }
  ngOnInit(): void {
    this.loginControlForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })

  }

  onSignIn(event: Event) {
    const userData = this.loginControlForm.value;
    this.authService.signIn(userData.username, userData.password)
      .then(() => {
        this.router.navigate(['/app']);
        console.log('User signed in successfully!');
      })
      .catch(error => {
        console.error('Error signing in:', error);
      });
  }

  logOut() {
    try {
      this.authService.signOut();

      this.loggedIn = false;
    }
    catch (error) {
      console.error('Error signing in:', error);
    };

  }

}


