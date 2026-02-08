import { signIn } from "@junobuild/core";
import { Button } from "./Button";

export const Login = () => {
  const signInWithDev = async () => {
    // Sign in for local development and E2E only
    await signIn({
      dev: {},
    });
  };

  return <Button onClick={signInWithDev}>Sign in for dev</Button>;
};
