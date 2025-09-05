import {
  Component,
  computed,
  ElementRef,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import {
  SignProgress,
  SignProgressFn,
  signUp,
  WebAuthnSignUpProgressStep,
} from '@junobuild/core';
import { PasskeyProgress } from '../../../types/passkey';
import { ButtonComponent } from '../../button/button.component';
import { ProgressComponent } from '../progress/progress.component';

type ProgressSignUp =
  | {
      state: 'init' | 'setup' | 'hidden';
    }
  | {
      state: 'progress';
      detail: SignProgress<WebAuthnSignUpProgressStep>;
    };

@Component({
  selector: 'app-create-passkey',
  imports: [ButtonComponent, ProgressComponent],
  templateUrl: './create-passkey.component.html',
})
export class CreatePasskeyComponent {
  readonly WebAuthnSignUpProgressStep = WebAuthnSignUpProgressStep;

  readonly wizardProgress = input.required<PasskeyProgress | undefined>();
  readonly wizardOnProgress = output<PasskeyProgress | undefined>();

  @ViewChild('inputText') readonly inputText:
    | ElementRef<HTMLInputElement>
    | undefined;
  passkeyDisplayName = signal<string>('');

  readonly #computedProgress = computed<ProgressSignUp>(() => {
    const progress = this.wizardProgress();

    return progress === undefined
      ? { state: 'init' }
      : 'signUp' in progress
        ? { state: 'progress', detail: progress.signUp }
        : 'setup' in progress
          ? { state: 'setup' }
          : { state: 'hidden' };
  });

  get progress(): ProgressSignUp {
    return this.#computedProgress();
  }

  goToSetup() {
    this.wizardOnProgress.emit({ setup: null });
  }

  async doSignUp() {
    try {
      const onProgress: SignProgressFn<WebAuthnSignUpProgressStep> = (
        progress,
      ) => this.wizardOnProgress.emit({ signUp: progress });

      await signUp({
        webauthn: {
          options: {
            onProgress,
            ...(this.passkeyDisplayName() !== '' && {
              passkey: {
                user: {
                  displayName: this.passkeyDisplayName(),
                },
              },
            }),
          },
        },
      });
    } catch (error: unknown) {
      this.wizardOnProgress.emit(undefined);

      // IRL the error would be gracefully displayed to the user unless
      // it is one to ignore - for example when the user cancel the flow.
      throw error;
    }
  }

  onInputChange() {
    this.passkeyDisplayName.set(this.inputText?.nativeElement.value ?? '');
  }
}
