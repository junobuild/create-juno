import { Component, computed, input } from '@angular/core';
import {
  signIn,
  SignProgress,
  SignProgressFn,
  WebAuthnSignInProgressStep,
} from '@junobuild/core';
import type { PasskeyProgress } from '../../../types/passkey';
import { ButtonComponent } from '../../button/button.component';
import { ProgressComponent } from '../progress/progress.component';

type ProgressSignIn = SignProgress<WebAuthnSignInProgressStep> | undefined | null;

@Component({
  selector: 'app-use-passkey',
  imports: [ButtonComponent, ProgressComponent],
  templateUrl: './use-passkey.component.html',
})
export class UsePasskeyComponent {
  readonly WebAuthnSignInProgressStep = WebAuthnSignInProgressStep;

  readonly wizardProgress = input.required<PasskeyProgress | undefined>();
  wizardOnProgress =
    input.required<(progress: PasskeyProgress | undefined) => void>();

  readonly #computedProgress = computed<ProgressSignIn>(() => {
    const progress = this.wizardProgress();

    return progress === undefined
      ? undefined
      : "signIn" in progress ? progress.signIn : null;
  });

  get progress(): ProgressSignIn {
    return this.#computedProgress();
  }

  async doSignIn () {
    const onProgress: SignProgressFn<WebAuthnSignInProgressStep> = (progress) =>
      this.wizardOnProgress()({ signIn: progress });

    try {
      await signIn({
        webauthn: {
          options: { onProgress },
        },
      });
    } catch (error: unknown) {
      this.wizardOnProgress()(undefined);

      // IRL the error would be gracefully displayed to the user unless
      // it is one to ignore - for example when the user cancel the flow.
      throw error;
    }
  };
}
