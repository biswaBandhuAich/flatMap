import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './service/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginControlForm: FormGroup;


  constructor(private authService: AuthenticationService, private fb: FormBuilder) {
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
        console.log('User signed in successfully!');
      })
      .catch(error => {
        console.error('Error signing in:', error);
      });
  }

}


