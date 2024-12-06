import {Component} from '@angular/core';
import {signIn} from '@junobuild/core';
import {ButtonComponent} from '../button/button.component';

@Component({
  selector: 'app-login',
  imports: [ButtonComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  readonly signIn = signIn;
}
