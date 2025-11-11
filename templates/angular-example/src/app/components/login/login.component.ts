import { Component } from '@angular/core';
import { PasskeyComponent } from '../passkey/passkey/passkey.component';
import { LoginComponentWithII } from '../login-with-ii/login-with-ii.component';
import { LoginComponentWithGoogle } from '../login-with-google/login-with-google.component';

@Component({
  selector: 'app-login',
  imports: [LoginComponentWithII, PasskeyComponent, LoginComponentWithGoogle],
  templateUrl: './login.component.html',
})
export class LoginComponent {}
