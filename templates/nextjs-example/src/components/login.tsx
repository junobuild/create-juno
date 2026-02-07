import { Button } from "@/components/button";
import { signIn } from "@junobuild/core";

export const Login = () => {
  const signInWithDev = async () => {
    // Sign in for local development and E2E only
    await signIn({
      dev: {},
    });
  };

  return <Button onClick={signInWithDev}>Sign in for dev</Button>;
};
