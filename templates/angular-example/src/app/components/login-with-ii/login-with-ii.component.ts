import { Component } from '@angular/core';
import { signIn } from '@junobuild/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-login-with-ii',
  imports: [ButtonComponent],
  templateUrl: './login-with-ii.component.html',
})
export class LoginComponentWithII {
  readonly signIn = signIn;
}
