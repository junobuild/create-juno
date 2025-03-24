import { Button } from "@/components/button";
import { signIn } from "@junobuild/core";

export const Login = () => {
  return <Button onClick={signIn} testId="login-button">Sign in</Button>;
};
