import { Button } from "@/components/button";
import {
  WebAuthnSignUpProgressStep,
  type WebAuthnSignProgress,
  type WebAuthnSignProgressFn,
  signUp,
} from "@junobuild/core";
import { useEffect, useState } from "react";
import { Progress } from "@/components/passkey/progress";
import { PasskeyProps } from "@/types/passkey";

export const CreatePasskey = ({
  progress: overallProgress,
  onProgress: overallOnProgress,
}: PasskeyProps) => {
  const [progress, setProgress] = useState<
    WebAuthnSignProgress<WebAuthnSignUpProgressStep> | undefined | null
  >();

  const onProgress: WebAuthnSignProgressFn<WebAuthnSignUpProgressStep> = (
    progress,
  ) => overallOnProgress({ signUp: progress });

  useEffect(() => {
    if (overallProgress === undefined) {
      setProgress(undefined);
      return;
    }

    setProgress("signUp" in overallProgress ? overallProgress.signUp : null);
  }, [overallProgress]);

  const doSignIn = async () => {
    try {
      await signUp({
        webauthn: {
          options: { onProgress },
        },
      });
    } catch (error: unknown) {
      overallOnProgress(undefined);

      // IRL the error would be gracefully displayed to the user unless
      // it is one to ignore - for example when the user cancel the flow.
      throw error;
    }
  };

  return (
    <>
      {progress === null ? (
        <></>
      ) : progress === undefined ? (
        <>
          <p>
            First time here? Use your face or fingerprint to access the
            application.
          </p>

          <Button onClick={doSignIn}>Create a new passkey</Button>
        </>
      ) : (
        <Progress>
          {progress?.step ===
            WebAuthnSignUpProgressStep.CreatingUserCredential && (
            <span>Creating user credential...</span>
          )}
          {progress?.step ===
            WebAuthnSignUpProgressStep.ValidatingUserCredential && (
            <span>Validating user credential...</span>
          )}
          {progress?.step ===
            WebAuthnSignUpProgressStep.FinalizingCredential && (
            <span>Finalizing credential...</span>
          )}
          {progress?.step === WebAuthnSignUpProgressStep.Signing && (
            <span>Signing request....</span>
          )}
          {progress?.step === WebAuthnSignUpProgressStep.FinalizingSession && (
            <span>Finalizing session...</span>
          )}
          {progress?.step === WebAuthnSignUpProgressStep.RegisteringUser && (
            <span>Registering user...</span>
          )}
        </Progress>
      )}
    </>
  );
};
