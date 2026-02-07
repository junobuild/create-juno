import { signIn } from "@junobuild/core";
import { FC } from "react";
import { Button } from "./Button";

export const Login: FC = () => {
  const signInWithDev = async () => {
    // Sign in for local development and E2E only
    await signIn({
      dev: {},
    });
  };

  return <Button onClick={signInWithDev}>Sign in for dev</Button>;
};
