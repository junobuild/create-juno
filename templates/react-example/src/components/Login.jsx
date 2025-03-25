import { signIn } from "@junobuild/core";
import { Button } from "./Button";

export const Login = () => {
  return (
    <Button onClick={signIn} testId="login-button">
      Sign in
    </Button>
  );
};
