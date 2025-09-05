import { Component } from '@angular/core';
import { signIn } from '@junobuild/core';
import { ButtonComponent } from '../button/button.component';
import { PasskeyComponent } from '../passkey/passkey/passkey.component';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent, PasskeyComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  readonly signIn = signIn;
}
