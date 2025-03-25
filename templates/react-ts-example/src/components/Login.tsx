import { signIn } from "@junobuild/core";
import { FC } from "react";
import { Button } from "./Button";

export const Login: FC = () => {
  return (
    <Button onClick={signIn} testId="login-button">
      Sign in
    </Button>
  );
};
