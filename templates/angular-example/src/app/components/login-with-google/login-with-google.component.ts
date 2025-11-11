import { Component, signal } from '@angular/core';
import { signIn } from '@junobuild/core';
import { ButtonComponent } from '../button/button.component';
import { BackdropComponent } from '../backdrop/backdrop.component';

@Component({
  selector: 'app-login-with-google',
  imports: [ButtonComponent, BackdropComponent],
  templateUrl: './login-with-google.component.html',
})
export class LoginComponentWithGoogle {
  #showModal = signal(false);

  get showModal(): boolean {
    return this.#showModal();
  }

  start() {
    this.#showModal.set(true);
  }

  close() {
    this.#showModal.set(false);
  }
}
