import { Component } from '@angular/core';
import { SignProgress, WebAuthnSignUpProgressStep } from '@junobuild/core';

type ProgressSignUp =
  | {
  state: "init" | "setup" | "hidden";
}
  | {
  state: "progress";
  detail: SignProgress<WebAuthnSignUpProgressStep>;
};

@Component({
  selector: 'app-create-passkey',
  templateUrl: './create-passkey.html',
})
export class CreatePasskey {

}
