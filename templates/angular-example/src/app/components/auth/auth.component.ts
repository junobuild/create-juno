import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../login/login.component';
import { LogoutComponent } from '../logout/logout.component';

@Component({
  selector: 'app-auth',
  imports: [LoginComponent, LogoutComponent, NgIf],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  private readonly authService = inject(AuthService);

  readonly signedIn = this.authService.signedIn;
}
