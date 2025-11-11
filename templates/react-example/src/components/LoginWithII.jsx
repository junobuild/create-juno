import { signIn } from "@junobuild/core";
import { Button } from "./Button";

export const LoginWithII = () => {
  const signWithII = async () => {
    await signIn({
      internet_identity: {},
    });
  };

  return <Button onClick={signWithII}>Continue with Internet Identity</Button>;
};
