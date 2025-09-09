import { Component, signal, OnInit } from '@angular/core';
import { isWebAuthnAvailable } from '@junobuild/core';
import { PasskeyProgress } from '../../../types/passkey';
import { ButtonComponent } from '../../button/button.component';
import { CreatePasskeyComponent } from '../create-passkey/create-passkey.component';
import { UsePasskeyComponent } from '../use-passkey/use-passkey.component';
import { BackdropComponent } from '../../backdrop/backdrop.component';

@Component({
  selector: 'app-passkey',
  templateUrl: './passkey.component.html',
  imports: [
    ButtonComponent,
    CreatePasskeyComponent,
    UsePasskeyComponent,
    BackdropComponent,
  ],
})
export class PasskeyComponent implements OnInit {
  readonly #passkeySupported = signal(true);
  #showModal = signal(false);
  #passkeyProgress = signal<PasskeyProgress | undefined>(undefined);

  get passkeySupported(): boolean {
    return this.#passkeySupported();
  }
  get showModal(): boolean {
    return this.#showModal();
  }
  get progress(): PasskeyProgress | undefined {
    return this.#passkeyProgress();
  }

  ngOnInit() {
    isWebAuthnAvailable().then((withWebAuthn) =>
      this.#passkeySupported.set(withWebAuthn),
    );
  }

  start() {
    this.#passkeyProgress.set(undefined);
    this.#showModal.set(true);
  }

  close() {
    this.#showModal.set(false);
    this.#passkeyProgress.set(undefined);
  }

  onProgress(progress: PasskeyProgress | undefined): void {
    this.#passkeyProgress.set(progress);
  }
}
