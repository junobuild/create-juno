import { Component } from '@angular/core';
import { signOut } from '@junobuild/core';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.component.html',
})
export class LogoutComponent {
  readonly signOut = signOut;
}
